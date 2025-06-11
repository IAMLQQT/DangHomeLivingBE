import { User } from "@modules/users/entities/user.entity";
import { UserService } from "@modules/users/users.service";
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  SerializeOptions,
} from "@nestjs/common";
import { Public } from "src/modules/auth/decorators/public.decorator";
import { AuthService } from "./auth.service";
import { SentOtpDto } from "./dto/sent-otp.dto";
import { SignInDto } from "./dto/sign-in.dto";

@Controller("app/auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
  ) {}

  @Public()
  @Post("sign-in")
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(
      false,
      signInDto.username,
      signInDto.password,
    );
  }

  @Get("profile")
  @SerializeOptions({ type: User })
  async getProfile(@Request() req): Promise<User> {
    const user = await this.usersService.findOne({ id: req.user.id });

    return user;
  }

  @Public()
  @Post("sent-otp")
  async sentOtp(@Body() body: SentOtpDto) {
    return this.authService.sentOtp(false, body.email);
  }
}
