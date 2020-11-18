import { EntityRepository, Repository } from 'typeorm';
import { LessonEntity } from '@lesson/entities';

@EntityRepository(LessonEntity)
export class LessonRepository extends Repository<LessonEntity> {

}
