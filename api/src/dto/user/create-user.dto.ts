import { IsString, IsEmail, MinLength, MaxLength, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  email: string;

  @MaxLength(20)
  userName: string;

  @MaxLength(10)
  userType: string;
  
  // User Access
  @IsString()
  @MaxLength(60)
  password: string;

  @IsBoolean()
  userAdmin: boolean;

  @IsBoolean()
  status: boolean;

  // @IsString()
  // idUser?: string;

}
