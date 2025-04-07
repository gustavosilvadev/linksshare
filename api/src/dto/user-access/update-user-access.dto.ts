import { IsString, MaxLength, IsBoolean } from 'class-validator';

export class UpdateUserAccessDto {
  @IsString()
  @MaxLength(200)
  password: string;

  @IsBoolean()
  user_admin: boolean;

  @IsBoolean()
  status: string;
}