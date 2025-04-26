import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaConnectionMiddleware } from './middleware/prisma-connection.middleware';
import { UserModule } from './modules/user/user.module';
import { UserAccessModule } from './modules/user/user-access.module';
import { LinkModule } from './modules/link/link.module';
import { LogPageViewModule } from './modules/log-page-view/log-page-view.module';
import { ProfileController } from './controllers/profile/profile.controller';
import { ProfileService } from './services/profile/profile.service';

@Module({
  imports: [
    PrismaModule, 
    UserModule, 
    LinkModule, 
    LogPageViewModule,
    UserModule,
    UserAccessModule
  ],
  providers: [
    PrismaService,
    ProfileService
  ],
  controllers: [ProfileController],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PrismaConnectionMiddleware)
      .forRoutes('*');
  }
}
