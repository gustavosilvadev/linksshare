import { Module } from '@nestjs/common';
import { ClicksLinkService } from './clicks_link.service';
import { ClicksLinkController } from './clicks_link.controller';

@Module({
  providers: [ClicksLinkService],
  controllers: [ClicksLinkController]
})
export class ClicksLinkModule {}
