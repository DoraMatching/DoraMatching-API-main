import { EntityRepository, Repository } from 'typeorm';
import { TraineeEntity } from '@trainee/entities';

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
