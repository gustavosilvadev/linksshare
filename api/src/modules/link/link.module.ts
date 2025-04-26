import { Module } from '@nestjs/common';
import { LinkController } from '../../controllers/link/link.controller';
import { LinkService } from '../../services/link/link.service';
import { UserService } from 'src/services/user/user.service';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [LinkController],
  providers: [LinkService, UserService],
})
export class LinkModule {}