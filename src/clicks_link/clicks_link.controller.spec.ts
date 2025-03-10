import { Test, TestingModule } from '@nestjs/testing';
import { ClicksLinkController } from './clicks_link.controller';

describe('ClicksLinkController', () => {
  let controller: ClicksLinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClicksLinkController],
    }).compile();

    controller = module.get<ClicksLinkController>(ClicksLinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
