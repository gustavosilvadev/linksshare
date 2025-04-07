import { IsString, IsNumber, MinLength, MaxLength, IsBoolean } from 'class-validator';

export class CreateLinkDto {

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
  viewStatus: boolean;

  @IsNumber()
  positionLink: number

  @IsString()
  @MaxLength(255)
  previewBeforeClick: string;

  // @IsString()
  // idUser?: string;
} 
