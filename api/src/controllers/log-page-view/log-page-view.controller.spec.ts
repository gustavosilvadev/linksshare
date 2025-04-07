import { Test, TestingModule } from '@nestjs/testing';
import { LogPageViewController } from './log-page-view.controller';

describe('LogPageViewController', () => {
  let controller: LogPageViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogPageViewController],
    }).compile();

    controller = module.get<LogPageViewController>(LogPageViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
