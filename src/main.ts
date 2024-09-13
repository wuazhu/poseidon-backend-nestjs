import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, HttpStatus, BadRequestException } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './commons/filters/prisma-client-exception/prisma-client-exception.filter';
import { ResponseInterceptor } from './commons/interceptor/response/response.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor())

  // 全局校验管道
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: true, // 如果设置为true，验证器会跳过未传参数的校验
    transform: true, // 启用参数类型自动转换，常规设置
    // 设置校验失败后返回的http状态码
    errorHttpStatusCode: HttpStatus.BAD_REQUEST, 
    // 设置校验失败后的响应数据格式
    exceptionFactory: (errors) => {
      // 此处要注意，errors是一个对象数组，包含了当前所调接口里，所有验证失败的参数及错误信息。
      // 此处的处理是只返回第一个错误信息
      let message = Object.values(errors[0].constraints)[0];
      console.log("🚀 ~ bootstrap ~ message:", message)
      return new BadRequestException({
         message,
         data: null,
         code: HttpStatus.BAD_REQUEST
      })
    }
  }))
  // 全局过滤器
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  await app.listen(3000);
}
bootstrap();
