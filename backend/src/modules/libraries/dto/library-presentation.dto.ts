import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { BaseDTO } from '../../../common/base/base.dto';

export class LibraryPresentationDTO extends BaseDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  imdbID: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  poster: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  imdbRating: string;
}
