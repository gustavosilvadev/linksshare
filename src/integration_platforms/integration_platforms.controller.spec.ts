import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationPlatformsController } from './integration_platforms.controller';

describe('IntegrationPlatformsController', () => {
  let controller: IntegrationPlatformsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntegrationPlatformsController],
    }).compile();

    controller = module.get<IntegrationPlatformsController>(IntegrationPlatformsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
