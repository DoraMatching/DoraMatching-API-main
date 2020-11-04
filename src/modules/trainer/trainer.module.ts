import { TrainerRepository } from '@trainer/repositories';
import { UserRepository } from '@user/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerController } from '@trainer/trainer.controller';
import { TrainerService } from '@trainer/trainer.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, TrainerRepository]),
    ],
    providers: [TrainerService],
    controllers: [TrainerController],
})
export class TrainerModule {
}
