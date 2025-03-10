import { Test, TestingModule } from '@nestjs/testing';
import { CustomPageService } from './custom_page.service';

describe('CustomPageService', () => {
  let service: CustomPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomPageService],
    }).compile();

    service = module.get<CustomPageService>(CustomPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
