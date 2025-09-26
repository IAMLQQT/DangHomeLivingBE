import { LoggerService } from "@common/logger/logger.service";
import { UserService } from "@modules/users/users.service";
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { generateId } from "@src/utils/generator";
import { SignUpDto } from "./dto/sign-up.dto";
import bcrypt from "bcryptjs";
import { RedisService } from "@modules/cache/redis.service";
import { ClientError } from "@common/kernel/custom-error";
import ErrorCode from "@common/kernel/error.code";
import { PayloadDto } from "./dto/payload.dto";
import { random } from "nanoid";
import { randomOtp } from "@src/utils/random";
import { loadTemplate } from "@common/mail/mail.template";
import { MailEnum } from "@common/enum/mail.enum";
import { RecoverPassWordDto } from "./dto/recover-password.dto";

@Injectable()
export class AuthService {
    saltOrRounds: number = 10;
    constructor(
        private configService: ConfigService,
        private jwtService: JwtService,
        private loggerService: LoggerService,
        private mailerService: MailerService,
        private usersService: UserService,
        private redisService: RedisService,
    ) { }
    async signUp(isAdminUser: boolean, signUpDto: SignUpDto): Promise<any> {
        signUpDto.id = generateId();
        signUpDto.isAdminUser = isAdminUser;
        signUpDto.roles = ["users"];
        signUpDto.username = signUpDto.email;
        signUpDto.password = await bcrypt.hash(
            signUpDto.password,
            this.saltOrRounds,
        )
        const cacheKey = this.redisService.getOtpKey(signUpDto.email, isAdminUser);
        const otp = await this.redisService.get(cacheKey);

        if (!otp) {
            throw new ClientError(ErrorCode.INVALID_OTP);
        }

        if (otp !== signUpDto.otp) {
            throw new ClientError(
                ErrorCode.INVALID_OTP,
            );
        }

        const exisUser = await this.usersService.findOne({
            username: signUpDto.username,
            isAdminUser: signUpDto.isAdminUser
        })

        if (exisUser) {
            throw new ClientError(
                ErrorCode.EXITS_USER_ERROR,
            );
        }

        return await this.usersService.create(signUpDto);

    }

    async signIn(
        isAdminUser: boolean,
        username: string,
        password: string,
    ): Promise<{ accessToken: string, payload: PayloadDto }> {
        const user = await this.usersService.findOne({ username, isAdminUser });
        if (!user) throw new ClientError(ErrorCode.INCORRECT_LOGIN_INFO, { username });

        const isMatch = await bcrypt.compare(password, user?.password);
        if (!user || !isMatch) throw new ClientError(ErrorCode.INCORRECT_LOGIN_INFO, { username });

        const payload = {
            id: user.id,
            isAdminUser: user.isAdminUser,
            username: user.username,
            roles: user.roles,
        }

        const accessToken = await this.jwtService.signAsync(payload);

        const cacheKey = this.redisService.getAccessTokenKey(payload);
        this.redisService.set(cacheKey, accessToken, 3600);

        return { accessToken, payload };
    }

    public async sentOtp(isAdminUser: boolean, email: string): Promise<void> {
        const cacheKey = this.redisService.getOtpKey(email, isAdminUser);
        const ttl = this.configService.get<number>("auth.otpTTL") ?? 300;
        const otp = randomOtp(this.configService.get<number>("auth.otpLength") ?? 6);
        await this.redisService.set(cacheKey, otp, ttl);

        const html = loadTemplate(MailEnum.SIGN_UP.template, { email, otp });

        this.mailerService
            .sendMail({
                to: email,
                from: this.configService.get<string>("mail.from"),
                subject: MailEnum.SIGN_UP.subject,
                html,
            })
            .then(() => {
                this.loggerService.info("sentOtp to: " + email);
            })
            .catch((error) => {
                this.loggerService.log("error", "sentOtp", error);
            });
    }

    async recoverPassword(
        isAdminUser: boolean,
        recoverPasswordDto: RecoverPassWordDto,
    ): Promise<any> {
        const cacheKey = this.redisService.getOtpKey(
            recoverPasswordDto.email,
            isAdminUser,
        );
        const otp = await this.redisService.get(cacheKey);

        if (otp !== recoverPasswordDto.otp)
            throw new ClientError(ErrorCode.INVALID_OTP, {});

        const password = await bcrypt.hash(
            recoverPasswordDto.password,
            this.saltOrRounds,
        );

        const user = await this.usersService.updateOne(
            { username: recoverPasswordDto.email, isAdminUser },
            { password },
        );

        return user;
    }

    async signOut(isAdminUser: boolean, username: string): Promise<any> {
        const cacheKey = this.redisService.getAccessTokenKey({
            username,
            isAdminUser,
        });

        return await this.redisService.set(cacheKey, "", 0);
    }
}