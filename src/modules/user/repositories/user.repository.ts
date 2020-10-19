import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    getUserById(id: string) {
        return this.createQueryBuilder()
          .select([
              'id',
              'name',
              'roles',
          ])
          .where('id = :id', { id })
          .execute();
    }

    updateUser(id: string, updateUser: Partial<UserEntity>, password: string) {
        return this.createQueryBuilder()
          .update(UserEntity)
          .set({ ...updateUser, password })
          .where('id = :id', { id })
          .execute();
    }
}
