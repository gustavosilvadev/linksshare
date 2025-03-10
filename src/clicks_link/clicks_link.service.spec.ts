import { Test, TestingModule } from '@nestjs/testing';
import { ClicksLinkService } from './clicks_link.service';

describe('ClicksLinkService', () => {
  let service: ClicksLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClicksLinkService],
    }).compile();

    service = module.get<ClicksLinkService>(ClicksLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
