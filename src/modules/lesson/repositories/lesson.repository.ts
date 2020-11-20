import { EntityRepository, Repository } from 'typeorm';
import { LessonEntity } from '@lesson/entities';
import { IPagination, PaginateParams } from '@/shared';
import { EntityResults } from '@/commons';
import { TimeRangeQuery } from '@lesson/time-range.params';
import moment from 'moment';

@EntityRepository(LessonEntity)
export class LessonRepository extends Repository<LessonEntity> {
    async getAllLessonsByClasseId(classeId: string, { order, limit, page }: Partial<PaginateParams>): Promise<EntityResults<LessonEntity>> {
        try {
            const [entities, count] = await this.createQueryBuilder('lesson')
              .leftJoinAndSelect('lesson.classe', 'classe')
              .where('classe.id = :classeId', { classeId })
              .select(['lesson'])
              .orderBy('lesson.createdAt', order)
              .skip(limit * (page - 1))
              .take(limit)
              .getManyAndCount();
            return { entities, count };
        } catch (e) {
            console.error(e);
        }
    }

    async getOneLessonBeforeOfTrainer(trainerId: string, startTime: Date) {
        try {
            const lesson = await this.createQueryBuilder('lesson')
              .leftJoinAndSelect('lesson.classe', 'classe')
              .leftJoinAndSelect('classe.trainer', 'trainer')
              .where('trainer.id = :trainerId', { trainerId })
              .andWhere('lesson.startTime < :startTime', { startTime: moment(startTime).utc(true).format('YYYY-MM-DD HH:mm:ss') })
              .orderBy('lesson.startTime', 'DESC')
              .select(['lesson'])
              .getOne();
            return lesson;
        } catch (e) {
            console.error(e);
        }
    }

    async getAllLessonByTrainerId(trainerId: string, { startTime, endTime }: TimeRangeQuery) {
        try {
            const lessons = await this.createQueryBuilder('lesson')
              .leftJoinAndSelect('lesson.classe', 'classe')
              .leftJoinAndSelect('classe.trainer', 'trainer')
              .where('trainer.id = :trainerId', { trainerId })
              .andWhere('lesson.startTime >= :startTime', { startTime: moment(startTime).utc(true).format('YYYY-MM-DD HH:mm:ss') })
              .andWhere('lesson.startTime < :endTime', { endTime: moment(endTime).utc(true).format('YYYY-MM-DD HH:mm:ss+07') })
              .orderBy('lesson.startTime', 'DESC')
              .select('lesson')
              .getMany();
            return lessons;
        } catch (e) {
            console.error(e);
        }
    }
}
