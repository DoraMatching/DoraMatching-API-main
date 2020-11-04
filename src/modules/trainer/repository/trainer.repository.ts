import { EntityRepository, Repository } from 'typeorm';
import { TrainerEntity } from '@trainer/entites/trainer.entity';

@EntityRepository(TrainerEntity)
export class TrainerRepository extends Repository<TrainerEntity> {
    async getAllTrainers() {
        return this.createQueryBuilder('trainer')
          .innerJoinAndSelect('trainer.user', 'user')
          .select(['trainer', 'user'])
          .getMany();
    }
}
