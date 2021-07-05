import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class User extends Document {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  password: string;
}
