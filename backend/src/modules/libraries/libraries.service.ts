import { Library } from './interfaces/library.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLibraryDTO } from './dto';

@Injectable()
export class LibrariesService {
  constructor(
    @InjectModel('Library') private readonly libraryModel: Model<Library>,
  ) {}

  async getAllByUser(userId: string) {
    return await this.libraryModel.find({ userId }).exec();
  }

  async getById(id: string) {
    return await this.libraryModel.findById(id).exec();
  }

  async create(createLibrary: CreateLibraryDTO) {
    const library = new this.libraryModel(createLibrary);

    return await library.save();
  }

  async delete(id: string) {
    return await this.libraryModel.deleteOne({ _id: id }).exec();
  }
}
