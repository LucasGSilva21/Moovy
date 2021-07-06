import { Document } from 'mongoose';

export class Library extends Document {
  userId: string;
  imdbID: string;
  poster: string;
  title: string;
  imdbRating: string;
}
