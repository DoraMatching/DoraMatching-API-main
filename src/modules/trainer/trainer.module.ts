import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerRepository } from '@trainer/repositories';
import { TrainerController } from '@trainer/trainer.controller';
import { TrainerService } from '@trainer/trainer.service';
import { UserRepository } from '@user/repositories';
import { ClasseRepository } from '@classe/repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRepository,
            TrainerRepository,
            ClasseRepository,
        ]),
    ],
    providers: [TrainerService],
    controllers: [TrainerController],
})
export class TrainerModule {}
