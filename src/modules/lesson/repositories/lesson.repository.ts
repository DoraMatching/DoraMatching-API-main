import { EntityRepository, Repository } from 'typeorm';
import { LessonEntity } from '@lesson/entities';
import { IPagination, PaginateParams } from '@/shared';
import { EntityResults } from '@/commons';

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
}
