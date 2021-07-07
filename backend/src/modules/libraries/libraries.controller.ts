import { Library } from './interfaces/library.interface';
import { LibrariesService } from './libraries.service';
import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateLibraryDTO } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('libraries')
@ApiTags('libraries')
export class LibrariesController {
  constructor(private librariesService: LibrariesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async getAllByUser(@Param('userId') userId: string): Promise<Library[]> {
    return this.librariesService.getAllByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Library> {
    return this.librariesService.getById(id);
  }

  @Post()
  async create(@Body() createLibrary: CreateLibraryDTO): Promise<Library> {
    return this.librariesService.create(createLibrary);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.librariesService.delete(id);
  }
}
