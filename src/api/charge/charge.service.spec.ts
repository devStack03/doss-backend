import { Test, TestingModule } from '@nestjs/testing';
import { ChargeService } from './charge.service';

describe('ChargeService', () => {
  let service: ChargeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChargeService],
    }).compile();

    service = module.get<ChargeService>(ChargeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
