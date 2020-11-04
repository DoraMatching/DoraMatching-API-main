import { Test, TestingModule } from '@nestjs/testing';
import { TraineeController } from './trainee.controller';

describe('TraineeController', () => {
  let controller: TraineeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TraineeController],
    }).compile();

    controller = module.get<TraineeController>(TraineeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
