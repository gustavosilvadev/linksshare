import { Module } from '@nestjs/common';
import { ClicksLinkService } from './clicks_link.service';
import { ClicksLinkController } from './clicks_link.controller';
import { PrismaModule } from 'prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  providers: [ClicksLinkService],
  controllers: [ClicksLinkController]
})
export class ClicksLinkModule {}
