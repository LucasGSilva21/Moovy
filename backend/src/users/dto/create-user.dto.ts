import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @MinLength(5)
  @MaxLength(60)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(60)
  @IsNotEmpty()
  password: string;
}
