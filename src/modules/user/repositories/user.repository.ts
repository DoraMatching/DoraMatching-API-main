import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { IUserModel, UserModel } from '@user/dto/user.model';

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

    updateUser(id: string, updateUser: Partial<UserEntity>) {
        return this.createQueryBuilder()
          .update(UserEntity)
          .set(updateUser)
          .where('id = :id', { id })
          .execute();
    }
}
