import { EntityResults } from '@/commons';
import { PaginateParams } from '@/shared';
import { TraineeEntity } from '@trainee/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TraineeEntity)
export class TraineeRepository extends Repository<TraineeEntity> {
    private readonly SELECT_TRAINEE_SCOPE = [
        'trainee',
        'user.id',
        'user.username',
        'user.name',
        'user.email',
        'user.avatarUrl',
        'user.roles',
        'user.type',
        'classe',
        'cTrainer',
        'tUser.id',
        'tUser.username',
        'tUser.name',
        'tUser.email',
        'tUser.avatarUrl',
        'tUser.roles',
        'tUser.type',
        'topic',
    ];

    async getAllTrainees({ order, limit, page }: Partial<PaginateParams>): Promise<EntityResults<TraineeEntity>> {
        try {
            const [entities, count] = await this.createQueryBuilder('trainee')
              .leftJoinAndSelect('trainee.user', 'user')
              .leftJoinAndSelect('trainee.classes', 'classe')
              .leftJoinAndSelect('classe.trainer', 'cTrainer')
              .leftJoinAndSelect('cTrainer.user', 'tUser')
              .select(this.SELECT_TRAINEE_SCOPE)
              .orderBy('trainee.createdAt', order)
              .skip(limit * (page - 1))
              .take(limit)
              .getManyAndCount();
            return { entities, count };
        } catch (e) {
            console.error(e);
        }
    }

    async getTraineeById(id: string): Promise<TraineeEntity> {
        try {
            return this.createQueryBuilder('trainee')
              .leftJoinAndSelect('trainee.user', 'user')
              .leftJoinAndSelect('trainee.classes', 'classe')
              .leftJoinAndSelect('classe.trainer', 'cTrainer')
              .leftJoinAndSelect('cTrainer.user', 'tUser')
              .leftJoinAndSelect('classe.topic', 'topic')
              .where('trainee.id = :id', { id })
              .select(this.SELECT_TRAINEE_SCOPE)
              .getOne();
        } catch (e) {
            console.error(e);
        }
    }

    async getTraineeByUserId(id: string): Promise<TraineeEntity> {
        try {
            return this.createQueryBuilder('trainee')
              .leftJoinAndSelect('trainee.user', 'user')
              .leftJoinAndSelect('trainee.classes', 'classe')
              .leftJoinAndSelect('classe.trainer', 'cTrainer')
              .leftJoinAndSelect('cTrainer.user', 'tUser')
              .leftJoinAndSelect('classe.topic', 'topic')
              .where('user.id = :id', { id })
              .select(this.SELECT_TRAINEE_SCOPE)
              .getOne();
        } catch (e) {
            console.error(e);
        }
    }
}
