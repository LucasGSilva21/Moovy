import { UserMovie } from './interfaces/user-movie.interface';
import { UserMovieService } from './user-movie.service';
import { Controller, Get, Param, Body, Post, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users-movies')
export class UserMovieController {
    constructor(
        private userMovieService: UserMovieService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('user/:userId')
    async getAllByUser(@Param('userId') userId: string): Promise<UserMovie[]> {
        return this.userMovieService.getAll(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<UserMovie> {
        return this.userMovieService.getById(id);
    }

    @Post()
    async create(@Body() user: UserMovie): Promise<UserMovie> {
        return this.userMovieService.create(user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.userMovieService.delete(id);
    }
}
