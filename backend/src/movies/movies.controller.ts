import { Movie } from './movie';
import { MoviesService } from './movies.service';
import { Controller, Get, Param, Body, Post, Delete } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    constructor(
        private moviesService: MoviesService,
    ) { }

    @Get()
    async getAll(): Promise<Movie[]> {
        return this.moviesService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<Movie> {
        return this.moviesService.getById(id);
    }

    @Post()
    async create(@Body() user: Movie): Promise<Movie> {
        return this.moviesService.create(user);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.moviesService.delete(id);
    }
}
