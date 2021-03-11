import { User } from './user';
import { UsersService } from './users.service';
import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';

@Controller('users')
export class UsersController { 
    constructor(
        private usersService: UsersService,
    ) { }

    @Get()
    async getAll(): Promise<User[]> {
        return this.usersService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<User> {
        return this.usersService.getById(id);
    }

    @Post()
    async create(@Body() user: User): Promise<User> {
        return this.usersService.create(user);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() user: User): Promise<User> {
        return this.usersService.update(id, user);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
}
