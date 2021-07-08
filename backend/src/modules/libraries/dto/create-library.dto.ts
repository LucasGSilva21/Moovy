import { OmitType } from '@nestjs/swagger';
import { LibraryPresentationDTO } from './library-presentation.dto';

export class CreateLibraryDTO extends OmitType(LibraryPresentationDTO, [
  '_id',
  'createdAt',
  'updatedAt',
  '_v',
] as const) {}
