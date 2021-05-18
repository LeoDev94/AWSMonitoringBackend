import { Test, TestingModule } from '@nestjs/testing';
import { RespositorioService } from './respositorio.service';

describe('RespositorioService', () => {
  let service: RespositorioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RespositorioService],
    }).compile();

    service = module.get<RespositorioService>(RespositorioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
