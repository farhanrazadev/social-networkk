import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UserUpdateDto extends CreateUserDto { }

export class ActivateUser {
    @IsString()
    Email: string;
} 
