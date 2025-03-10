import { Test, TestingModule } from '@nestjs/testing';
import { AccessedPageService } from './accessed_page.service';

describe('AccessedPageService', () => {
  let service: AccessedPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessedPageService],
    }).compile();

    service = module.get<AccessedPageService>(AccessedPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
