import { IsString, IsNumber, IsNotEmpty, MinLength, MaxLength, IsBoolean} from 'class-validator';

export class CreateLinkDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(15)
  @MaxLength(150)
  href: string;

  @IsString()
  @MaxLength(100)
  description: string;

  @IsBoolean()
  viewStatus: boolean;

  @IsNotEmpty()
  @IsNumber()
  positionLink: number

  @IsString()
  @MaxLength(255)
  previewBeforeClick: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
} 
