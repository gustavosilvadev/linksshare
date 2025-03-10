import { Module } from '@nestjs/common';
import { UserAccessService } from './user_access.service';
import { UserAccessController } from './user_access.controller';

@Module({
  providers: [UserAccessService],
  controllers: [UserAccessController]
})
export class UserAccessModule {}
