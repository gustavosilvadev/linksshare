import { IsString, IsEmail, MinLength, MaxLength, IsBoolean } from 'class-validator';

export class UpdateUserAccessDto {
  @IsString()
  @MaxLength(60)
  password: string;

  @IsBoolean()
  userAdmin: boolean;

  @IsBoolean()
  status: boolean;

  @MaxLength(32)
  idUser: string;

}
