import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  last_name?: string;

  @IsEmail()
  email: string;

  @MinLength(20)
  user_name:string;

  @MinLength(20)
  user_type:string;

}
