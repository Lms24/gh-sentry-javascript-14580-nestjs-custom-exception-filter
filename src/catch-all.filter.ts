import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import type { Response } from 'express';
import { SentryExceptionCaptured } from '@sentry/nestjs';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  @SentryExceptionCaptured()
  catch(
    exception: unknown & { getStatus?: () => number; message?: string },
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(500).json({ error: 'testing error' });
  }
}
