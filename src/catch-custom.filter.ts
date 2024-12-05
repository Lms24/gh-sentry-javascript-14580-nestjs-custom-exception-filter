import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import type { Response } from 'express';
import { CustomException, SentryExceptionCaptured } from './sentryTest';

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  @SentryExceptionCaptured()
  catch(exception: CustomException, host: ArgumentsHost): void {
    console.log('yy CustomExceptionFilter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(500).json({ error: 'Some Custom error' });
  }
}
