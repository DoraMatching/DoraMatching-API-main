import { Injectable } from '@nestjs/common';
import { LessonEntity } from '@lesson/entities';
import { LessonRepository } from '@lesson/repositories';
import { BaseService } from '@/commons';
import { ClasseRepository } from '@classe/repositories';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { TrainerRepository } from '@trainer/repositories';
import { CreateLessonDTO } from '@lesson/dto/create-lesson.dto';
import { JwtUser } from '@user/dto';

@Injectable()
export class LessonService extends BaseService<LessonEntity, LessonRepository>{
    constructor(
      private readonly trainerRepository: TrainerRepository,
      private readonly classeRepository: ClasseRepository,
      private readonly lessonRepository: LessonRepository,
      @InjectRolesBuilder()
      private readonly rolesBuilder: RolesBuilder
    ) {
        super(lessonRepository);
    }

    async createLessonByClasseId(classId: string, data: CreateLessonDTO, jwtUser: JwtUser) {

    }
}
