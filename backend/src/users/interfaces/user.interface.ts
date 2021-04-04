import { Document } from 'mongoose';

export class User extends Document {
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
