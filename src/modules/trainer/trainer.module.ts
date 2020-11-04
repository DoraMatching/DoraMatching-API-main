import { Module } from '@nestjs/common';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@user/repositories/user.repository';
import { TrainerRepository } from '@trainer/repository/trainer.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, TrainerRepository]),
    ],
    providers: [TrainerService],
    controllers: [TrainerController],
})
export class TrainerModule {
}
