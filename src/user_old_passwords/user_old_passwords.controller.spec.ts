import { Test, TestingModule } from '@nestjs/testing';
import { UserOldPasswordsController } from './user_old_passwords.controller';

describe('UserOldPasswordsController', () => {
  let controller: UserOldPasswordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserOldPasswordsController],
    }).compile();

    controller = module.get<UserOldPasswordsController>(UserOldPasswordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
