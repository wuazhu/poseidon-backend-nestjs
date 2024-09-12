import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, HttpStatus, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe({
  
  //   transform: true, // 启用参数类型自动转换，常规设置
  //   // 设置校验失败后返回的http状态码
  //   errorHttpStatusCode: HttpStatus.BAD_REQUEST, 
  //   // 设置校验失败后的响应数据格式
  //   exceptionFactory: (errors) => {
  //     // 此处要注意，errors是一个对象数组，包含了当前所调接口里，所有验证失败的参数及错误信息。
  //     // 此处的处理是只返回第一个错误信息
  //     let message = Object.values(errors[0].constraints)[0];
  //     console.log("🚀 ~ bootstrap ~ message:", message)
  //     return new BadRequestException({
  //        message,
  //        data: null,
  //        code: HttpStatus.BAD_REQUEST
  //     })
  //   }
  // }))
  await app.listen(3000);
}
bootstrap();
