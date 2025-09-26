import { IsNotEmpty } from "class-validator";

export class SentOtpDto {
    @IsNotEmpty()
    email: string;
}