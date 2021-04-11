import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { UserDTO } from './user.dto';

export class CreateUserDTO extends OmitType(UserDTO, [
  '_id',
  'created_at',
  'updated_at',
  '_v'
] as const) {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(60)
  @IsNotEmpty()
  password: string;
}
