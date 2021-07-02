import { UserMovie } from './interfaces/user-movie.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserMovieDTO } from './dto';

@Injectable()
export class UserMovieService {
  constructor(
    @InjectModel('UserMovie') private readonly userMovieModel: Model<UserMovie>,
  ) {}

  async getAll(userId: string) {
    return await this.userMovieModel.find({ userId }).exec();
  }

  async getById(id: string) {
    return await this.userMovieModel.findById(id).exec();
  }

  async create(userMovie: CreateUserMovieDTO) {
    const createdMovie = new this.userMovieModel(userMovie);
    return await createdMovie.save();
  }

  async delete(id: string) {
    return await this.userMovieModel.deleteOne({ _id: id }).exec();
  }
}
