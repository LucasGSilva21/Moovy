import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './interfaces/user.interface';
import { UserPresentationDTO, CreateUserDTO, UpdateUserDTO } from './dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [UserPresentationDTO],
  })
  async getAll(): Promise<UserPresentationDTO[]> {
    return this.usersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: UserPresentationDTO,
  })
  async getById(@Param('id') id: string): Promise<UserPresentationDTO> {
    return this.usersService.getById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserPresentationDTO,
  })
  async create(@Body() user: CreateUserDTO): Promise<UserPresentationDTO> {
    return this.usersService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: UserPresentationDTO,
  })
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserDTO,
  ): Promise<User> {
    return this.usersService.update(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Success',
  })
  async delete(@Param('id') id: string) {
    this.usersService.delete(id);
  }
}
