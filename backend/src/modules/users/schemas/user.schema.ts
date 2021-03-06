import { Schema, HookNextFunction } from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 255,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next: HookNextFunction) {
  const hash = await bcrypt.hash(this['password'], 10);
  this['password'] = hash;

  return next();
});
