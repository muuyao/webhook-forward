import { Body, Controller, Post } from '@nestjs/common';
import { FeishuService } from './feishu.service';

@Controller('feishu')
export class FeishuController {
  constructor(private feishuService: FeishuService) {}
  @Post()
  async receiver(@Body() body: any) {
    console.log('body', body);
    return this.feishuService.receiver();
  }
}
