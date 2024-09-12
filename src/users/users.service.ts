import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}
  private users = [
    {
      id: 1,
      username: "wuazhu",
      nickname: 'nickname3',
      gender: 1,
      role: 'ROOT',
      email: 'aa@qq.com'
    },
    {
      id: 2,
      username: "wuazhu2",
      nickname: 'nickname3',
      gender: 0,
      role: 'ROOT',
      email: 'aa@qq.com'
    },
    {
      id: 3,
      username: 'test3',
      nickname: 'nickname3',
      gender: 0,
      role: 'ROOT',
      email: 'aa@qq.com'
    }
  ]
  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: createUserDto
    })
  }

  async findAll(keywords?: string, pageNum: number=1, pageSize: number=10) {
    const _page = pageNum-1
    if (keywords) {
      const _keywords = keywords.toLowerCase().trim()
      return this.databaseService.user.findMany({
        where: {
          username: {
            contains: _keywords,
            mode: 'insensitive',
            not: '', 
          }
        },
        skip: _page,
        take: pageSize
      })
    } else {
      return this.databaseService.user.findMany({
        skip: _page,
        take: pageSize
      })
    }
  }

  async findOne(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id
      }
    })
    if (!user) {
      throw new NotFoundException('id错误')
    }
    return user
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    try {
      const res = await this.databaseService.user.update({
        where: {
          id
        },
        data: updateUserDto
      })
      console.log("🚀 ~ UsersService ~ update ~ res:", res)
    } catch (error) {
      throw new Error(error.message)
    }
    // const _arr = []
    // this.users = this.users.map(item => {
    //   if (item.id===id) {
    //     const _item = {
    //       ...item,
    //       ...updateUserDto
    //     }
    //     _arr.push(_item)
    //     return _item
    //   } else {
    //     return item
    //   }
    // })
    // if (!_arr.length) {
    // }
    // return _arr
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
