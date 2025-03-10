import { Test, TestingModule } from '@nestjs/testing';
import { UserAccessController } from './user_access.controller';

describe('UserAccessController', () => {
  let controller: UserAccessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAccessController],
    }).compile();

    controller = module.get<UserAccessController>(UserAccessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
