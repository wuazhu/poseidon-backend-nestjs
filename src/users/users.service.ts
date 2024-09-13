import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma,  } from '@prisma/client';


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
    return await this.databaseService.user.create({
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
        omit: {
          email: true,
          password: true,
        },
        skip: _page,
        take: pageSize
      })
    } else {
      return this.databaseService.user.findMany({
        skip: _page,
        take: pageSize,
        omit: {
          email: true,
          password: true,
        },
      })
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: {
          id
        },
        omit: {
          email: true,
          password: true,
        },
      })
      return user
    } catch (error) {
      console.log('error--',error);
      throw new Prisma.PrismaClientValidationError('参数错误', {
        clientVersion: Prisma.prismaVersion.client
      })
    }
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    // try {
      const res = await this.databaseService.user.update({
        where: {
          id
        },
        data: updateUserDto
      })
      console.log("🚀 ~ UsersService ~ update ~ res:", res)
    // } catch (error) {
    //   throw new HttpExceptionFilter()
    // }
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
