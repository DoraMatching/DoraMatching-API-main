import { EntityRepository, Repository } from 'typeorm';
import { MeetingEntity } from '../entities';

@EntityRepository(MeetingEntity)
export class MeetingRepository extends Repository<MeetingEntity> {}
