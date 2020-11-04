import { EntityRepository, Repository } from 'typeorm';
import { TrainerEntity } from '@trainer/entites/trainer.entity';

@EntityRepository(TrainerEntity)
export class TrainerRepository extends Repository<TrainerEntity> {

}
