import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import dayjs from 'dayjs'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log("🚀 ~ HttpExceptionFilter ~ exception:", exception)
    const ctx = host.switchToHttp();
    // console.log("🚀 ~ HttpExceptionFilter ~ ctx:", ctx)
    const response = ctx.getResponse<Response>();
    // console.log("🚀 ~ HttpExceptionFilter ~ response:", response)
    const request = ctx.getRequest<Request>();
    // console.log("🚀 ~ HttpExceptionFilter ~ request:", request)
    const status = exception.getStatus();
    console.log('进入拦截器')
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? '服务器错误（Service Error）' : '客户端错误（Client Error）'}`;

    response
      .status(status)
      .header('Content-Type', 'application/json; charset=utf-8')
      .json({
        code: status,
        success: status === HttpStatus.OK,
        data: null,
        path: request.url,
        message,
        timestamp: dayjs().unix(),
      });
  }
}
