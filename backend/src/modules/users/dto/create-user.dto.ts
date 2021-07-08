import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { UserPresentationDTO } from './user-presentation.dto';

export class CreateUserDTO extends OmitType(UserPresentationDTO, [
  '_id',
  'createdAt',
  'updatedAt',
  '_v',
] as const) {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(60)
  @IsNotEmpty()
  password: string;
}
