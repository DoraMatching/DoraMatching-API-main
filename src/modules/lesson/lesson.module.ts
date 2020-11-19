import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonRepository } from '@lesson/repositories';
import { UserRepository } from '@user/repositories';
import { ClasseRepository } from '@classe/repositories';
import { TrainerRepository } from '@trainer/repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClasseRepository, TrainerRepository, LessonRepository, UserRepository]),
    ],
    providers: [LessonService],
    controllers: [LessonController],
})
export class LessonModule {
}
