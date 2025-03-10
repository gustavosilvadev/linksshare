import { Module } from '@nestjs/common';
import { CustomPageService } from './custom_page.service';
import { CustomPageController } from './custom_page.controller';

@Module({
  providers: [CustomPageService],
  controllers: [CustomPageController]
})
export class CustomPageModule {}
