import { Module } from '@nestjs/common';
import { LinkController } from '../../controllers/link/link.controller';
import { LinkService } from '../../services/link/link.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LinkController],
  providers: [LinkService]
})
export class LinkModule {}
