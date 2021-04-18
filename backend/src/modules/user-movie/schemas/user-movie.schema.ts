import { Schema } from 'mongoose';

export const UserMovieSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
