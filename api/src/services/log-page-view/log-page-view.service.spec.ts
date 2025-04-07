import { Test, TestingModule } from '@nestjs/testing';
import { LogPageViewService } from './log-page-view.service';

describe('LogPageViewService', () => {
  let service: LogPageViewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogPageViewService],
    }).compile();

    service = module.get<LogPageViewService>(LogPageViewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
