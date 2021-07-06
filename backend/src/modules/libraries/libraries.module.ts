import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LibrarySchema } from './schemas/library.schema';
import { LibrariesController } from './libraries.controller';
import { LibrariesService } from './libraries.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Library', schema: LibrarySchema }]),
  ],
  controllers: [LibrariesController],
  providers: [LibrariesService],
})
export class UserMovieModule {}
