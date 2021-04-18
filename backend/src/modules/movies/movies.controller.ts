import { Movie } from './movie';
import { MoviesService } from './movies.service';
import { Controller, Get, Param, Body, Post, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('movies')
export class MoviesController {
    constructor(
        private moviesService: MoviesService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get('user/:userId')
    async getAllByUser(@Param('userId') userId: string): Promise<Movie[]> {
        return this.moviesService.getAll(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<Movie> {
        return this.moviesService.getById(id);
    }

    @Post()
    async create(@Body() user: Movie): Promise<Movie> {
        return this.moviesService.create(user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.moviesService.delete(id);
    }
}
