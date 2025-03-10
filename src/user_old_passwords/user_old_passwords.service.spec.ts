import { Test, TestingModule } from '@nestjs/testing';
import { UserOldPasswordsService } from './user_old_passwords.service';

describe('UserOldPasswordsService', () => {
  let service: UserOldPasswordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserOldPasswordsService],
    }).compile();

    service = module.get<UserOldPasswordsService>(UserOldPasswordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
