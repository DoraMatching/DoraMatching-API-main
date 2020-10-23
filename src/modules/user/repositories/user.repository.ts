import { EntityResults } from '@/commons/entity-results';
import { PaginateParams } from '@shared/pagination';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    private readonly SELECT_USER_SCOPE = [
        'user.id',
        'user.name',
        'user.email',
        'user.avatarUrl',
        'user.roles',
        'user.type',
    ];

    getUserById(id: string) {
        return this.createQueryBuilder()
          .select([
              'id',
              'name',
              'roles',
              'type',
          ])
          .where('id = :id', { id })
          .execute();
    }

    async getAllUsers({ order, limit, page }: Partial<PaginateParams>): Promise<EntityResults<UserEntity>> {
        try {
            const [entities, count] = await this.createQueryBuilder('user')
              .select(this.SELECT_USER_SCOPE)
              .orderBy('user.createdAt', order)
              .skip(limit * (page - 1))
              .take(limit)
              .getManyAndCount();
            return { entities, count };
        } catch (e) {
            console.error(e);
        }
    }

    updateUser(id: string, updateUser: Partial<UserEntity>, password: string) {
        return this.createQueryBuilder()
          .update(UserEntity)
          .set({ ...updateUser, password })
          .where('id = :id', { id })
          .execute();
    }
}
