import { Module } from '@nestjs/common';
import { LogPageViewController } from '../../controllers/log-page-view/log-page-view.controller';
import { LogPageViewService } from '../../services/log-page-view/log-page-view.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LogPageViewController],
  providers: [LogPageViewService]
})
export class LogPageViewModule {}
