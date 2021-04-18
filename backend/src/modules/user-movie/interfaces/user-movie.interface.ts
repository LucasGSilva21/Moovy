import { Document } from 'mongoose';

export class UserMovie extends Document {
  userId: string;
  movieId: string;
}
