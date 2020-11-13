import { Module } from '@nestjs/common';
import { TraineeService } from './trainee.service';
import { TraineeController } from './trainee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@user/repositories';
import { TraineeRepository } from '@trainee/repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, TraineeRepository]),
    ],
    providers: [TraineeService],
    controllers: [TraineeController],
})
export class TraineeModule {
}
