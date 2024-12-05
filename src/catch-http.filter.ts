import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Response } from 'express';
import { SentryExceptionCaptured } from './sentryTest';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  @SentryExceptionCaptured()
  catch(exception: HttpException, host: ArgumentsHost): void {
    console.log('yy HttpExceptionFilter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(500).json({ error: 'Some Http error' });
  }
}
