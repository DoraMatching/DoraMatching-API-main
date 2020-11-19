import { AppResources } from '@/app.roles';
import { BaseService } from '@/commons';
import { grantPermission } from '@/shared';
import { ClasseRepository } from '@classe/repositories';
import { CreateLessonDTO } from '@lesson/dto';
import { LessonEntity } from '@lesson/entities';
import { LessonRepository } from '@lesson/repositories';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TrainerRepository } from '@trainer/repositories';
import { JwtUser } from '@user/dto';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

@Injectable()
export class LessonService extends BaseService<LessonEntity, LessonRepository> {
    constructor(
      private readonly trainerRepository: TrainerRepository,
      private readonly classeRepository: ClasseRepository,
      private readonly lessonRepository: LessonRepository,
      @InjectRolesBuilder()
      private readonly rolesBuilder: RolesBuilder,
    ) {
        super(lessonRepository);
    }

    async createLessonByClasseId(classeId: string, data: CreateLessonDTO, jwtUser: JwtUser) {
        const classe = await this.classeRepository.getClasseById(classeId);
        if (!classe) throw new HttpException(`Classe with id: ${classeId} not found`, HttpStatus.NOT_FOUND);
        const permission = grantPermission(this.rolesBuilder, AppResources.CLASSE, 'create', jwtUser, null);
        if (permission.granted) {
            data = permission.filter(data);
            const newLesson = this.lessonRepository.create(data);
            classe.lessons.push(newLesson);
            try {
                await this.classeRepository.save(classe);
                return this.classeRepository.getClasseById(classeId);
            } catch ({ detail }) {
                throw new HttpException(detail || `OOPS! Can't create lesson`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }
}
