import { Document } from 'mongoose';

export class Movie extends Document {
  userId: string;
  movieId: string;
}
