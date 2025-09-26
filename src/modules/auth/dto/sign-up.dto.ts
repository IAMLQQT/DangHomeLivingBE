import { IsNotEmpty, ValidateIf } from "class-validator";

export class SignUpDto {
    id: string;
    isAdminUser: boolean;
    roles: string[];
    
    @IsNotEmpty() 
    fullName: string;

    @IsNotEmpty()
    email: string
    
    @ValidateIf((o, value) => !!value)
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    otp: string;
}