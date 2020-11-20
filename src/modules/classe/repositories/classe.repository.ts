import { EntityResults } from '@/commons';
import { PaginateParams } from '@/shared';
import { ClasseEntity } from '@classe/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ClasseEntity)
export class ClasseRepository extends Repository<ClasseEntity> {
    private readonly SELECT_CLASSE_SCOPE = [
        'classe',
        'trainer',
        'trainee',
        'topic',

        'uTrainer.id',
        'uTrainer.username',
        'uTrainer.avatarUrl',
        'uTrainer.name',
        'uTrainer.roles',
        'uTrainer.type',
        'uTrainer.createdAt',
        'uTrainer.updatedAt',

        'uTrainee.id',
        'uTrainee.username',
        'uTrainee.avatarUrl',
        'uTrainee.name',
        'uTrainee.roles',
        'uTrainee.type',
        'uTrainee.createdAt',
        'uTrainee.updatedAt',

        'lesson'
    ];

    async getAllClasses({ order, limit, page }: Partial<PaginateParams>): Promise<EntityResults<ClasseEntity>> {
        try {
            const [entities, count] = await this.createQueryBuilder('classe')
              .leftJoinAndSelect('classe.trainer', 'trainer')
              .leftJoinAndSelect('classe.members', 'trainee')
              .leftJoinAndSelect('classe.topic', 'topic')
              .leftJoinAndSelect('trainer.user', 'uTrainer')
              .leftJoinAndSelect('trainee.user', 'uTrainee')
              .leftJoinAndSelect('classe.lessons', 'lesson')
              .orderBy('classe.createdAt', order)
              .skip(limit * (page - 1))
              .take(limit)
              .select(this.SELECT_CLASSE_SCOPE)
              .getManyAndCount();
            return { entities, count };
        } catch (e) {
            console.error(e);
        }
    }

    async getClasseById(id: string): Promise<ClasseEntity> {
        try {
            return this.createQueryBuilder('classe')
              .leftJoinAndSelect('classe.trainer', 'trainer')
              .leftJoinAndSelect('classe.members', 'trainee')
              .leftJoinAndSelect('classe.topic', 'topic')
              .leftJoinAndSelect('trainer.user', 'uTrainer')
              .leftJoinAndSelect('trainee.user', 'uTrainee')
              .leftJoinAndSelect('classe.lessons', 'lesson')
              .where('classe.id = :id', { id })
              .select(this.SELECT_CLASSE_SCOPE)
              .getOne();
        } catch (e) {
            console.error(e);
        }
    }
}
