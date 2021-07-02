import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserMovieSchema } from './schemas/user-movie.schema';
import { UserMovieController } from './user-movie.controller';
import { UserMovieService } from './user-movie.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserMovie', schema: UserMovieSchema }]),
  ],
  controllers: [UserMovieController],
  providers: [UserMovieService],
})
export class UserMovieModule {}
