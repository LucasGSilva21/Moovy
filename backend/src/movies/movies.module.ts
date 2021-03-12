import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MovieSchema } from './schemas/movie.schema';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
    ],
    controllers: [
        MoviesController,
    ],
    providers: [
        MoviesService,
    ],
})
export class MoviesModule { }
