import { Module } from '@nestjs/common';
import { GroupUsersService } from './group_users.service';
import { GroupUsersController } from './group_users.controller';

@Module({
  providers: [GroupUsersService],
  controllers: [GroupUsersController]
})
export class GroupUsersModule {}
