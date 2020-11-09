import { EntityResults } from '@/commons';
import { PaginateParams } from '@/shared';
import { UserEntity } from '@user/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    private readonly SELECT_USER_SCOPE = [
        'user.id',
        'user.name',
        'user.email',
        'user.avatarUrl',
        'user.roles',
        'user.createdAt',
        'user.updatedAt',
        'user.type',
        'post.id',
        'post.title',
        'post.featuredImage',
        'post.createdAt',
        'post.updatedAt',
        'question.id',
        'question.title',
        'question.createdAt',
        'question.updatedAt',
        'pTag.id',
        'pTag.name',
        'qTag.id',
        'qTag.name',
    ];

    getUserById(id: string) {
        return this.createQueryBuilder('user')
          .leftJoinAndSelect('user.questions', 'question')
          .leftJoinAndSelect('user.posts', 'post')
          .leftJoinAndSelect('post.tags', 'pTag')
          .leftJoinAndSelect('question.tags', 'qTag')
          .select(this.SELECT_USER_SCOPE)
          .where('user.id = :id', { id })
          .getOne();
    }

    async getAllUsers({ order, limit, page }: Partial<PaginateParams>): Promise<EntityResults<UserEntity>> {
        try {
            const [entities, count] = await this.createQueryBuilder('user')
              .leftJoinAndSelect('user.questions', 'question')
              .leftJoinAndSelect('user.posts', 'post')
              .leftJoinAndSelect('post.tags', 'pTag')
              .leftJoinAndSelect('question.tags', 'qTag')
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
