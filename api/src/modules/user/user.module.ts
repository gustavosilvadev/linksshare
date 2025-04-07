import { Module } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { UserAccessService } from 'src/services/user/user-access-service';
import { UserController } from 'src/controllers/user/user.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserAccessService],
})
export class UserModule {}