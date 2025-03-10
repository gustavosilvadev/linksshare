import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UserOldPasswordsModule } from './user_old_passwords/user_old_passwords.module';
import { GroupUsersModule } from './group_users/group_users.module';
import { CustomPageModule } from './custom_page/custom_page.module';
import { LinksModule } from './links/links.module';
import { ClicksLinkModule } from './clicks_link/clicks_link.module';
import { AccessedPageModule } from './accessed_page/accessed_page.module';
import { IntegrationPlatformsModule } from './integration_platforms/integration_platforms.module';

@Module({
  imports: [PrismaModule, UsersModule, UserOldPasswordsModule, GroupUsersModule, CustomPageModule, LinksModule, ClicksLinkModule, AccessedPageModule, IntegrationPlatformsModule],
  providers: [PrismaService]
})

export class AppModule {}