import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(ValidationPipe) createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query('keywords') keywords?: string,
    @Query('pageNum') pageNum?: string,
    @Query('pageSize') pageSize?: string
  ) {
    return this.usersService.findAll(keywords, pageNum?+pageNum:1, pageSize?+pageSize:10)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: Prisma.UserUpdateInput) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
