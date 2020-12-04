import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TraineeRepository } from '@trainee/repositories';
import { UserRepository } from '@user/repositories';
import { TraineeController } from './trainee.controller';
import { TraineeService } from './trainee.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository, TraineeRepository])],
    providers: [TraineeService],
    controllers: [TraineeController],
})
export class TraineeModule {}
