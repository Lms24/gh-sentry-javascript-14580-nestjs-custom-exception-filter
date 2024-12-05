import { Controller, Get, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomException } from './sentryTest';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('error')
  throwError() {
    throw new Error('testing error');
  }

  @Get('http-error')
  throwHttpError() {
    throw new HttpException('testing http error', 503);
  }

  @Get('custom-error')
  throwCustomError() {
    throw new CustomException('testing custom error');
  }
}
