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
    ];

    async getAllTrainees({ order, limit, page }: Partial<PaginateParams>): Promise<EntityResults<TraineeEntity>> {
        try {
            const [entities, count] = await this.createQueryBuilder('trainee')
              .leftJoinAndSelect('trainee.user', 'user')
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
              .where('user.id = :id', { id })
              .select(this.SELECT_TRAINEE_SCOPE)
              .getOne();
        } catch (e) {
            console.error(e);
        }
    }
}
