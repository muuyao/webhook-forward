import { Injectable } from '@nestjs/common';

@Injectable()
export class FeishuService {
  receiver(): string {
    return 'Hello World! feishu';
  }
}
