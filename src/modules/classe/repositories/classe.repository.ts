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
        'uTrainer.phoneNumber',
        'uTrainer.email',
        'uTrainer.roles',
        'uTrainer.type',
        'uTrainer.createdAt',
        'uTrainer.updatedAt',

        'uTrainee.id',
        'uTrainee.username',
        'uTrainee.avatarUrl',
        'uTrainee.name',
        'uTrainee.phoneNumber',
        'uTrainee.email',
        'uTrainee.roles',
        'uTrainee.type',
        'uTrainee.createdAt',
        'uTrainee.updatedAt',

        'lesson',
    ];

    getOneClasseQueryBuilder() {
        return this.createQueryBuilder('classe')
            .leftJoinAndSelect('classe.trainer', 'trainer')
            .leftJoinAndSelect('classe.members', 'trainee')
            .leftJoinAndSelect('classe.topic', 'topic')
            .leftJoinAndSelect('trainer.user', 'uTrainer')
            .leftJoinAndSelect('trainee.user', 'uTrainee')
            .leftJoinAndSelect('classe.lessons', 'lesson')
            .select(this.SELECT_CLASSE_SCOPE);
    }

    getAllClassesQueryBuilder({ order, limit, page }: Partial<PaginateParams>) {
        return this.getOneClasseQueryBuilder()
            .orderBy('classe.createdAt', order)
            .skip(limit * (page - 1))
            .take(limit);
    }

    async getAllClasseByTopicId(
        topicId: string,
        pagOpts: Partial<PaginateParams>,
    ): Promise<EntityResults<ClasseEntity>> {
        try {
            const [entities, count] = await this.getAllClassesQueryBuilder(
                pagOpts,
            )
                .where('topic.id = :topicId', { topicId })
                .getManyAndCount();
            return { entities, count };
        } catch (e) {
            console.error(e);
        }
    }

    async getAllClasseByTrainerId(
        trainerId: string,
        pagOpts: Partial<PaginateParams>,
    ): Promise<EntityResults<ClasseEntity>> {
        try {
            const [entities, count] = await this.getAllClassesQueryBuilder(
                pagOpts,
            )
                .where('trainer.id = :trainerId', { trainerId })
                .getManyAndCount();
            return { entities, count };
        } catch (e) {
            console.error(e);
        }
    }

    async getAllClasses(
        pagOpts: Partial<PaginateParams>,
    ): Promise<EntityResults<ClasseEntity>> {
        try {
            const [entities, count] = await this.getAllClassesQueryBuilder(
                pagOpts,
            ).getManyAndCount();
            return { entities, count };
        } catch (e) {
            console.error(e);
        }
    }

    async getClasseById(id: string): Promise<ClasseEntity> {
        try {
            return this.getOneClasseQueryBuilder()
                .where('classe.id = :id', { id })
                .getOne();
        } catch (e) {
            console.error(e);
        }
    }
}
