import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';
import { BaseDTO } from '../../../core/base.dto';

export class UserDTO extends BaseDTO {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(60)
  @IsNotEmpty()
  email: string;
}
