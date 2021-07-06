import { ApiProperty } from '@nestjs/swagger';

export class CreateLibraryDTO {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  imdbID: string;

  @ApiProperty()
  poster: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  imdbRating: string;
}
