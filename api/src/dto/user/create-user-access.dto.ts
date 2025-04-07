import { IsString, MaxLength,IsBoolean } from 'class-validator';

export class CreateUserAccessDto {
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
