import { OmitType } from '@nestjs/swagger';
import { UserMovieDTO } from './user-movie.dto';

export class CreateUserDTO extends OmitType(UserMovieDTO, [
  '_id',
  'createdAt',
  'updatedAt',
  '_v'
] as const) {}
