import { UserMovie } from './interfaces/user-movie.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserMovieMapper } from './mapper/user-movie.mapper';

@Injectable()
export class UserMovieService {
    constructor(@InjectModel('UserMovie') private readonly userMovieModel: Model<UserMovie>) {}

    async getAll(userId: string) {
        const userMovies = await this.userMovieModel.find({ userId }).exec();

        return userMovies.map((userMovie) => UserMovieMapper.fromEntityToDTO(userMovie));
    }
    
    async getById(id: string) {
        return await this.userMovieModel.findById(id).exec();
    }

    async create(user: UserMovie) {
        const createdMovie = new this.userMovieModel(user);
        return await createdMovie.save();
    }
   
    async delete(id: string) {
        return await this.userMovieModel.deleteOne({ _id: id}).exec();
    }
}
