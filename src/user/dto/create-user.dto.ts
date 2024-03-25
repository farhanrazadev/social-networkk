import {IsEmail, IsNotEmpty} from 'class-validator';
export class CreateUserDto {
    @IsEmail()
    Email :string;

    @IsNotEmpty()
    Password : string;
} 