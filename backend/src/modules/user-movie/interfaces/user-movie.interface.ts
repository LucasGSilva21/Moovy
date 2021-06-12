import { Document } from 'mongoose';

export class UserMovie extends Document {
  userId: string;
  imdbID: string;
  poster: string;
  title: string;
  imdbRating: string;
  createdAt: Date;
  updatedAt: Date;
}
