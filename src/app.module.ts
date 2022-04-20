import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeishuModule } from './feishu/feishu.module';

@Module({
  imports: [FeishuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
