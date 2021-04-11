import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService { 
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async getAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }
    
    async getById(id: string) {
        return await this.userModel.findById(id).exec();
    }

    async getByEmail(email: string) {
        return await this.userModel.findOne({ email }).exec();
    }
    
    async create(user: CreateUserDTO): Promise<User> {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }
    
    async update(id: string, user: User) {
        await this.userModel.updateOne({ _id: id }, user).exec();
        return this.getById(id);
    }

    async delete(id: string) {
        return await this.userModel.deleteOne({ _id: id}).exec();
    }
}
