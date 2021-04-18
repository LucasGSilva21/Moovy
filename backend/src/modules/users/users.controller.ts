import { UsersService } from './users.service';
import { Controller, Get, Param, Body, Post, Put, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController { 
    constructor(
        private usersService: UsersService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<UserDTO[]> {
        return await this.usersService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<User> {
        return this.usersService.getById(id);
    }

    @Post()
    async create(@Body() user: CreateUserDTO): Promise<User> {
        return this.usersService.create(user);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() user: User): Promise<User> {
        return this.usersService.update(id, user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
}
