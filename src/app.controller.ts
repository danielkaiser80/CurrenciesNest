import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getInfo(): string {
    return 'This app is an example, for using and trying out NestJS while giving some use.';
  }
}
