import { EntityResults } from '@/commons';
import { PaginateParams } from '@/shared';
import { LessonEntity } from '@lesson/entities';
import { TimeRangeQuery } from '@lesson/time-range.params';
import moment from 'moment';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';

@EntityRepository(LessonEntity)
export class LessonRepository extends Repository<LessonEntity> {
    private readonly SELECT_LESSON_SCOPE = [
        'lesson',
        'classe',
        'trainer',
        'user.id',
        'user.username',
        'user.avatarUrl',
        'user.name',
        'user.roles',
        'user.type',
        'user.createdAt',
        'user.updatedAt',
    ];

    async getAllLessonsByClasseId(
        classeId: string,
        { order, limit, page }: Partial<PaginateParams>,
    ): Promise<EntityResults<LessonEntity>> {
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

    async getLessonByIdWithClasse(id: string): Promise<LessonEntity> {
        try {
            return await this.createQueryBuilder('lesson')
                .leftJoinAndSelect('lesson.classe', 'classe')
                .leftJoinAndSelect('classe.trainer', 'trainer')
                .leftJoinAndSelect('trainer.user', 'user')
                .where('lesson.id = :id', { id })
                .select(this.SELECT_LESSON_SCOPE)
                .getOne();
        } catch (e) {
            console.error(e);
        }
    }

    async getLessonById(id: string): Promise<LessonEntity> {
        try {
            return await this.createQueryBuilder('lesson')
                .where('lesson.id = :id', { id })
                .select(['lesson'])
                .getOne();
        } catch (e) {
            console.error(e);
        }
    }

    async getOneLessonBeforeOfTrainer(
        trainerId: string,
        startTime: Date,
    ): Promise<LessonEntity> {
        try {
            return await this.createQueryBuilder('lesson')
                .leftJoinAndSelect('lesson.classe', 'classe')
                .leftJoinAndSelect('classe.trainer', 'trainer')
                .where('trainer.id = :trainerId', { trainerId })
                .andWhere('lesson.startTime < :startTime', {
                    startTime: moment(startTime)
                        .utc(true)
                        .format('YYYY-MM-DD HH:mm:ss'),
                })
                .orderBy('lesson.startTime', 'DESC')
                .select(['lesson'])
                .getOne();
        } catch (e) {
            console.error(e);
        }
    }

    async getOneLessonBeforeOfTrainee(traineeId: string, startTime: Date) {
        try {
            return await this.createQueryBuilder('lesson')
                .leftJoinAndSelect('lesson.classe', 'classe')
                .leftJoinAndSelect('classe.members', 'trainee')
                .where('trainee.id = :traineeId', { traineeId })
                .andWhere('lesson.startTime < :startTime', {
                    startTime: moment(startTime)
                        .utc(true)
                        .format('YYYY-MM-DD HH:mm:ss'),
                })
                .orderBy('lesson.startTime', 'DESC')
                .select(['lesson'])
                .getOne();
        } catch (e) {
            console.error(e);
        }
    }

    getAllLesson({
        startTime,
        endTime,
    }: TimeRangeQuery): SelectQueryBuilder<LessonEntity> {
        return this.createQueryBuilder('lesson')
            .leftJoinAndSelect('lesson.classe', 'classe')
            .andWhere('lesson.startTime >= :startTime', {
                startTime: moment(startTime)
                    .utc(true)
                    .format('YYYY-MM-DD HH:mm:ss+07'),
            })
            .andWhere('lesson.startTime < :endTime', {
                endTime: moment(endTime)
                    .utc(true)
                    .format('YYYY-MM-DD HH:mm:ss+07'),
            })
            .orderBy('lesson.startTime', 'DESC')
            .select('lesson');
    }

    async getAllLessonByTrainerId(
        trainerId: string,
        timeRange: TimeRangeQuery,
    ): Promise<LessonEntity[]> {
        try {
            return await this.getAllLesson(timeRange)
                .leftJoinAndSelect('classe.trainer', 'trainer')
                .where('trainer.id = :trainerId', { trainerId })
                .getMany();
        } catch (e) {
            console.error(e);
        }
    }

    async getAllLessonsByTraineeId(
        traineeId: string,
        timeRange: TimeRangeQuery,
    ) {
        try {
            return await this.getAllLesson(timeRange)
                .leftJoinAndSelect('classe.members', 'trainee')
                .where('trainee.id = :traineeId', { traineeId })
                .getMany();
        } catch (e) {
            console.error(e);
        }
    }
}
