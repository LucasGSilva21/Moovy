import { Schema } from 'mongoose';

export const MovieSchema = new Schema({
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
