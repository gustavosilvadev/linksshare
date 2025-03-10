import { Test, TestingModule } from '@nestjs/testing';
import { AccessedPageController } from './accessed_page.controller';

describe('AccessedPageController', () => {
  let controller: AccessedPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessedPageController],
    }).compile();

    controller = module.get<AccessedPageController>(AccessedPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
