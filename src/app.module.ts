import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './catch-http.filter';
import { AllExceptionFilter } from './catch-all.filter';
import { CustomExceptionFilter } from './catch-custom.filter';

@Module({
  imports: [SentryModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionFilter,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: SentryGlobalFilter,
    // },
  ],
})
export class AppModule {}
