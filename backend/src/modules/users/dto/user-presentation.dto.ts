import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';
import { BaseDTO } from '../../../common/base/base.dto';

export class UserPresentationDTO extends BaseDTO {
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
