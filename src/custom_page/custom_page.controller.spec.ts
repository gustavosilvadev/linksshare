import { Test, TestingModule } from '@nestjs/testing';
import { CustomPageController } from './custom_page.controller';

describe('CustomPageController', () => {
  let controller: CustomPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomPageController],
    }).compile();

    controller = module.get<CustomPageController>(CustomPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
