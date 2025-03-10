import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { GroupUsersModule } from './group_users/group_users.module';
import { CustomPageModule } from './custom_page/custom_page.module';
import { LinksModule } from './links/links.module';
import { ClicksLinkModule } from './clicks_link/clicks_link.module';
import { AccessedPageModule } from './accessed_page/accessed_page.module';
import { IntegrationPlatformsModule } from './integration_platforms/integration_platforms.module';
import { UserAccessModule } from './user_access/user_access.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [PrismaModule, UsersModule, GroupUsersModule, CustomPageModule, LinksModule, ClicksLinkModule, AccessedPageModule, IntegrationPlatformsModule, UserAccessModule],
  providers: [PrismaService, AuthService]
})

export class AppModule {}