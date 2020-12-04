import { ClasseController } from '@classe/classe.controller';
import { ClasseService } from '@classe/classe.service';
import { ClasseRepository } from '@classe/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicRepository } from '@topic/repositories';
import { TraineeRepository } from '@trainee/repositories';
import { TrainerRepository } from '@trainer/repositories';
import { UserRepository } from '@user/repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRepository,
            ClasseRepository,
            TrainerRepository,
            TopicRepository,
            TraineeRepository,
        ]),
    ],
    controllers: [ClasseController],
    providers: [ClasseService],
})
export class ClasseModule {}
