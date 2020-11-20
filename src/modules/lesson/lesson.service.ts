import { AppResources } from '@/app.roles';
import { BaseService } from '@/commons';
import { customPaginate, grantPermission, paginateFilter, PaginateParams } from '@/shared';
import { ClasseRepository } from '@classe/repositories';
import { CreateLessonDTO, LessonRO } from '@lesson/dto';
import { LessonEntity } from '@lesson/entities';
import { LessonRepository } from '@lesson/repositories';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TrainerRepository } from '@trainer/repositories';
import { JwtUser } from '@user/dto';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { TimeRangeQuery } from '@lesson/time-range.params';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import _moment from 'moment';

const moment = extendMoment(Moment);

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

    timeContainLessons(timeRange: TimeRangeQuery, lessons: LessonEntity[]) {
        const range = moment.range(timeRange.startTime, timeRange.endTime);
        let result = [];
        lessons.forEach(lesson => {
            if (range.contains(lesson.startTime) || range.contains(_moment(lesson.startTime).add(lesson.duration, 'minutes'))) result.push(lesson);
        });
        return result;
    };

    checkOverlaps(lessonsInScope: LessonEntity[], newLesson: LessonEntity) {
        lessonsInScope.forEach(_lesson => {
            const range1 = moment.range(_lesson.startTime, _moment(_lesson.startTime).add(_lesson.duration, 'minutes'));
            const range2 = moment.range(newLesson.startTime, _moment(newLesson.startTime).add(newLesson.duration, 'minutes'));
            const isOverlaps = range1.overlaps(range2);
            if (isOverlaps) throw new HttpException(`OOPS! The new lesson will be overlap time with the lesson: ${_lesson.name}`, HttpStatus.CONFLICT);
        });
    }

    lessonsValidation(newLesson: LessonEntity, lessonsInScope: LessonEntity[]) {
        const isBeforeNow = _moment(newLesson.startTime).isBefore(new Date());
        if (isBeforeNow) throw new HttpException(`OOPS! Start-time of the new lesson is not valid`, HttpStatus.CONFLICT);
        this.checkOverlaps(lessonsInScope, newLesson);
    }

    async createLessonByClasseId(classeId: string, data: CreateLessonDTO, jwtUser: JwtUser) {
        const classe = await this.classeRepository.getClasseById(classeId);
        if (!classe) throw new HttpException(`Classe with id: ${classeId} not found`, HttpStatus.NOT_FOUND);
        const permission = grantPermission(this.rolesBuilder, AppResources.LESSON, 'create', jwtUser, null);
        if (permission.granted) {
            const trainer = await this.trainerRepository.getTrainerByUserId(jwtUser.id);
            if (!trainer) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            const timeRange: TimeRangeQuery = {
                startTime: data.startTime,
                endTime: _moment(data.startTime).add(data.duration, 'minutes').toDate(),
            };
            const lessonsInScope = await this.getTrainerLessons(trainer.id, timeRange, jwtUser);
            data = permission.filter(data);
            const newLesson = this.lessonRepository.create(data);
            this.lessonsValidation(newLesson, lessonsInScope);
            try {
                const _newLesson = await this.lessonRepository.save(newLesson);
                classe.lessons.push(_newLesson);
                await this.classeRepository.save(classe);
                return this.classeRepository.getClasseById(classeId);
            } catch ({ detail }) {
                throw new HttpException(detail || `OOPS! Can't create the lesson`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    async getAllLessonsByClasseId(classeId: string, pagOpts: PaginateParams, jwtUser: JwtUser) {
        const classe = await this.classeRepository.getClasseById(classeId);
        if (!classe) throw new HttpException(`Classe with id: ${classeId} not found`, HttpStatus.NOT_FOUND);
        const permission = grantPermission(this.rolesBuilder, AppResources.LESSON, 'read', jwtUser, null);
        if (permission.granted) {
            const data = await this.lessonRepository.getAllLessonsByClasseId(classeId, pagOpts);
            const result = customPaginate<LessonRO>(data, pagOpts);
            return paginateFilter(result, permission);
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    async getTrainerLessons(trainerId: string, timeRange: TimeRangeQuery, jwtUser: JwtUser) {
        const permission = grantPermission(this.rolesBuilder, AppResources.LESSON, 'read', jwtUser, null);
        if (permission.granted) {
            try {
                const [beforeLesson, lessons] = await Promise.all([
                    this.lessonRepository.getOneLessonBeforeOfTrainer(trainerId, timeRange.startTime),
                    this.lessonRepository.getAllLessonByTrainerId(trainerId, timeRange),
                ]);
                const result = beforeLesson ? [beforeLesson, ...lessons] : lessons;
                return this.timeContainLessons(timeRange, result);
            } catch ({ detail }) {
                throw new HttpException(detail || `OOPS! Can't get the lessons`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }
}
