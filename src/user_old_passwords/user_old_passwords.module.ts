import { Module } from '@nestjs/common';
import { UserOldPasswordsService } from './user_old_passwords.service';
import { UserOldPasswordsController } from './user_old_passwords.controller';

@Module({
  providers: [UserOldPasswordsService],
  controllers: [UserOldPasswordsController]
})
export class UserOldPasswordsModule {}
