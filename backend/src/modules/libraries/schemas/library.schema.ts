import { Schema } from 'mongoose';

export const LibrarySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    imdbID: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imdbRating: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
