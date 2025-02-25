import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;
    
}
