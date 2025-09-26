import { IsNotEmpty } from "class-validator";

export class RecoverPassWordDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    otp: string;
}