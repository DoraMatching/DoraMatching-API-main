import { Module } from '@nestjs/common';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';

@Module({
  providers: [TrainerService],
  controllers: [TrainerController]
})
export class TrainerModule {}
