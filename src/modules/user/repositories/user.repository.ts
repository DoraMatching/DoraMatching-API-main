import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    updateUser(id: string, updateUser: Partial<UserEntity>) {
        return this.createQueryBuilder()
            .update(UserEntity)
            .set(updateUser)
            .where('id = :id', { id })
            .execute();
    }
}