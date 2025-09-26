import { IsNotEmpty, IsEmail, ValidateIf, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
    id?: string;
    isAdminUser: boolean;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    fulllname?: string;

    @ValidateIf((o, value) => !!value)
    @IsEmail()
    email?: string;

    @ValidateIf((o, value) => !!value)
    @IsPhoneNumber()
    phone?: string;

    @ValidateIf((o, value) => !!value)
    status?: boolean;

    role?: string[];
    dob?: Date;
    gender?: string;
    identifyCard?: string;
}