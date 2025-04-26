// user.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { UserController } from 'src/controllers/user/user.controller';
import { PrismaService } from 'prisma/prisma.service';
import { UserAccessModule } from './user-access.module';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [UserAccessModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}