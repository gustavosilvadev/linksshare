import { Module } from '@nestjs/common';

import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UserModule } from './modules/user/user.module';
import { UserService } from './services/user/user.service';
import { LinkModule } from './modules/link/link.module';

@Module({
  imports: [PrismaModule, UserModule, LinkModule],
  providers: [PrismaService, UserService],
})
export class AppModule {}
