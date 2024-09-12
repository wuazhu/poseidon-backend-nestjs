import { IsString, IsInt,IsEmail,  IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    id: number
    @IsString()
    @IsNotEmpty({
        message: "用户名不能为空"
    })
    username: string

    @IsString()
    nickname: string
    
    @IsInt({
        message: '性别0:女性,1:男性'
    })
    gender: 0|1 // 0女1男

    @IsEnum(['ROOT','ADMIN','CUEST'], {
        message: '角色错误',
    })
    @IsNotEmpty({
        message: '角色不能为空'
    })
    role: 'ROOT'|'ADMIN'|'CUEST'
    
    @IsEmail({}, {
        message: '请输入正确的邮箱地址'
    })
    email: string
    
    // @IsString()
    // password: string
    
    // deptId: number
    
    // @IsString()
    // @IS_URL()
    // avatar: string
    
    // mobile: string
    // status: 0|1
    // createTime: string
    // updateTime: string
    // isDeleted: 0|1
}
