import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Public } from '../guard/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
