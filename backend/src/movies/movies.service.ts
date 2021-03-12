import { Movie } from './movie';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MoviesService {
    constructor(@InjectModel('Movie') private readonly movieModel: Model<Movie>) {}

    async getAll() {
        return await this.movieModel.find().exec();
    }
    
    async getById(id: string) {
        return await this.movieModel.findById(id).exec();
    }

    async create(user: Movie) {
        const createdMovie = new this.movieModel(user);
        return await createdMovie.save();
    }
   
    async delete(id: string) {
        return await this.movieModel.deleteOne({ _id: id}).exec();
    }
}
