import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
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
  create(createUserDto: CreateUserDto) {
    createUserDto.id = this.users[this.users.length-1].id + 1
    return this.users.push(createUserDto)
  }

  findAll(keywords?: string) {
    if (keywords) {
      const _keywords = keywords.toLowerCase().trim()
      return this.users.filter(item => item.username.toLowerCase().includes(_keywords))
    }
    return this.users
  }

  findOne(id: number) {
    const user = this.users.filter(item => item.id === id)
    if (!user.length) {
      throw new NotFoundException('id错误')
    }
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const _arr = []
    this.users = this.users.map(item => {
      if (item.id===id) {
        const _item = {
          ...item,
          ...updateUserDto
        }
        _arr.push(_item)
        return _item
      } else {
        return item
      }
    })
    if (!_arr.length) {
      throw new NotFoundException('id错误')
    }
    return _arr
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
