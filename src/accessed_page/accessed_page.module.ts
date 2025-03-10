import { Module } from '@nestjs/common';
import { AccessedPageService } from './accessed_page.service';
import { AccessedPageController } from './accessed_page.controller';

@Module({
  providers: [AccessedPageService],
  controllers: [AccessedPageController]
})
export class AccessedPageModule {}
