import { UserSerializerInterceptor } from "@common/interceptors/user-serializer.interceptor";
import { UserService } from "@modules/users/users.service";
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseInterceptors,
} from "@nestjs/common";
import { Public } from "src/modules/auth/decorators/public.decorator";
import { User } from "../users/entities/user.entity";
import { AuthService } from "./auth.service";
import { SentOtpDto } from "./dto/sent-otp.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { RecoverPassWordDto } from "./dto/recover-password.dto";

@Controller("admin/auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AdminAuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
  ) {}

  @Public()
  @Post("sent-otp")
  async sentOtp(@Body() body: SentOtpDto) {
    return this.authService.sentOtp(true, body.email);
  }

  @Public()
  @UseInterceptors(UserSerializerInterceptor)
  @Post("sign-up")
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(true, signUpDto);
  }

  @Public()
  @Post("sign-in")
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(
      true,
      signInDto.username,
      signInDto.password,
    );
  }

  @Public()
  @UseInterceptors(UserSerializerInterceptor)
  @Post("recover-password")
  recoverPassword(@Body() recoverPasswordDto: RecoverPassWordDto) {
    return this.authService.recoverPassword(true, recoverPasswordDto);
  }

  @Post("sign-out")
  signOut(@Req() req) {
    return this.authService.signOut(true, req.user.username);
  }

  @UseInterceptors(UserSerializerInterceptor)
  @Get("profile")
  async getProfile(@Request() req): Promise<User> {
    const user = await this.usersService.findOne({ id: req.user.id });

    return user;
  }
}
