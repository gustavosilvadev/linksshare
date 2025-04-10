import { Module } from '@nestjs/common';

import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UserModule } from './modules/user/user.module';
import { UserService } from './services/user/user.service';
import { UserAccessModule } from './modules/user/user-access.module';
// import { UserAccessService } from './services/user/user-access.service';
import { LinkModule } from './modules/link/link.module';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { LogPageViewModule } from './modules/log-page-view/log-page-view.module';

@Module({
  imports: [
    PrismaModule, 
    UserModule, 
    LinkModule, 
    LogPageViewModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET, 
      signOptions: { expiresIn: '1h'},
    }),
    UserAccessModule
  ],
  providers: [PrismaService, UserService, AuthService],
  controllers: [AuthController],
})
export class AppModule {}
