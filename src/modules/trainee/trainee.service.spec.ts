import { Test, TestingModule } from '@nestjs/testing';
import { TraineeService } from './trainee.service';

describe('TraineeService', () => {
  let service: TraineeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TraineeService],
    }).compile();

    service = module.get<TraineeService>(TraineeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
