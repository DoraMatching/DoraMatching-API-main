import { Module } from '@nestjs/common';
import { TraineeService } from './trainee.service';
import { TraineeController } from './trainee.controller';

@Module({
  providers: [TraineeService],
  controllers: [TraineeController]
})
export class TraineeModule {}
