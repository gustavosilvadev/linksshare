import { Module } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { UserController } from 'src/controllers/user/user.controller';
import { PrismaService } from 'prisma/prisma.service';
import { UserAccessModule } from './user-access.module';
@Module({
  imports: [UserAccessModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}