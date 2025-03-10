import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationPlatformsService } from './integration_platforms.service';

describe('IntegrationPlatformsService', () => {
  let service: IntegrationPlatformsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntegrationPlatformsService],
    }).compile();

    service = module.get<IntegrationPlatformsService>(IntegrationPlatformsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
