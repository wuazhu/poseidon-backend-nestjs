import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';

@Catch() // 捕获所有异常
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(
    exception: any,
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    console.log('------ 捕获的异常 ------');
    console.log('捕获的异常: message', exception.message);
    console.log('捕获的异常: code', (exception as Prisma.PrismaClientKnownRequestError).code);
    console.log('捕获的异常: name', exception.name);
    // console.log('捕获的异常: name', exception.code);
    let _mes =  exception.message.replace(/\n/g, '');
    let errorName = exception.name ?? 'BadRequestException'
    

    let message = `${_mes}`;
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // 当错误类型为 PrismaClientKnownRequestError
      switch (exception.code) {
        case 'P2002': // 唯一约束冲突
          message = message??'Duplicate field value entered,参数错误';
          statusCode = HttpStatus.BAD_REQUEST;
          break;
        case 'P2025': // 记录未找到
          message = message??'查不到该数据';
          statusCode = HttpStatus.NOT_FOUND;
          break;
        default:
          message = exception.message;
      }
      message = `Prisma错误: ${message}`
      console.log('情况1')
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      console.log('情况2')
    } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      console.log('情况3')
    } else if (exception instanceof HttpException) {
      // http错误
      switch (errorName) {
        case 'BadRequestException':
          statusCode = HttpStatus.BAD_REQUEST
          break;
        default:
          statusCode = HttpStatus.BAD_REQUEST
          break;
      }
      console.log('情况4')
    } else {
      console.log('情况5')
      message = (exception as any).message || message;
      statusCode = HttpStatus.BAD_REQUEST
    }

    response.status(statusCode).json({
      code: statusCode,
      success: false,
      data: null,
      path: request.url,
      message,
      timestamp: dayjs().valueOf(),
    });
  }
}