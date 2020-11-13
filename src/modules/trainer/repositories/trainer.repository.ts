import { EntityResults } from '@/commons';
import { PaginateParams } from '@/shared';
import { TrainerEntity } from '@trainer/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TrainerEntity)
export class TrainerRepository extends Repository<TrainerEntity> {
    private readonly SELECT_TRAINER_SCOPE = [
        'trainer',
        'user.id',
        'user.username',
        'user.name',
        'user.email',
        'user.avatarUrl',
        'user.roles',
        'user.type',
    ];

    async getAllTrainers({ order, limit, page }: Partial<PaginateParams>): Promise<EntityResults<TrainerEntity>> {
        try {
            const [entities, count] = await this.createQueryBuilder('trainer')
              .leftJoinAndSelect('trainer.user', 'user')
              .orderBy('trainer.createdAt', order)
              .skip(limit * (page - 1))
              .take(limit)
              .select(this.SELECT_TRAINER_SCOPE)
              .getManyAndCount();
            return { entities, count };
        } catch (e) {
            console.error(e);
        }
    }

    async getTrainerById(id: string): Promise<TrainerEntity> {
        try {
            return await this.createQueryBuilder('trainer')
              .leftJoinAndSelect('trainer.user', 'user')
              .where('trainer.id = :id', { id })
              .select(this.SELECT_TRAINER_SCOPE)
              .getOne();
        } catch (e) {
            console.error(e);
        }
    }

    async getTrainerByUserId(id: string): Promise<TrainerEntity> {
        try {
            return await this.createQueryBuilder('trainer')
              .leftJoinAndSelect('trainer.user', 'user')
              .where('user.id = :id', { id })
              .select(this.SELECT_TRAINER_SCOPE)
              .getOne();
        } catch (e) {
            console.error(e);
        }
    }
}
