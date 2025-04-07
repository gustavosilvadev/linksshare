import { IsString, IsBoolean, IsNumber, MinLength, MaxLength } from 'class-validator';

export class UpdateLinkDto {

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(15)
  @MaxLength(150)
  href: string;

  @IsString()
  @MaxLength(100)
  description: string;

  @IsBoolean()
  view_status: boolean;

  @IsNumber()
  position_link: number

  @IsString()
  @MaxLength(255)
  preview_before_click: string;

}
