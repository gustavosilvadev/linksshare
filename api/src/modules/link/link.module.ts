import { Module } from '@nestjs/common';
import { LinkController } from '../../controllers/link/link.controller';
import { LinkService } from '../../services/link/link.service';

import { UserService } from 'src/services/user/user.service';
import { ApiKeyAuthGuards } from 'src/services/auth/guards/api-key-auth.guard';

import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LinkController],
  providers: [LinkService, UserService, ApiKeyAuthGuards]
})
export class LinkModule {}
