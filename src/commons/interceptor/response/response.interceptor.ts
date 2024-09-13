import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("🚀 ~ ResponseInterceptor ~ intercept ~ context:", context)
    return next.handle().pipe(
      map((data) => ({
        code: HttpStatus.OK,
        success: true,
        data: data??null,
        timestamp: dayjs().valueOf(),
        message: 'success',
      })),
    );
  }
}
