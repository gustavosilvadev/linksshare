import { Module } from '@nestjs/common';
import { UserAccessService } from 'src/services/user/user-access.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [UserAccessService, PrismaService],
  exports: [UserAccessService],
})
export class UserAccessModule {}