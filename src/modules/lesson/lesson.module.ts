import { ClasseRepository } from '@classe/repositories';
import { LessonRepository } from '@lesson/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerRepository } from '@trainer/repositories';
import { UserRepository } from '@user/repositories';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ClasseRepository,
            TrainerRepository,
            LessonRepository,
            UserRepository,
        ]),
    ],
    providers: [LessonService],
    controllers: [LessonController],
})
export class LessonModule {}
