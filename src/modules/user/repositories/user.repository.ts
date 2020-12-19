import { EntityResults } from '@/commons';
import { PaginateParams } from '@/shared';
import { UserEntity } from '@user/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    private readonly SELECT_USER_SCOPE = [
        'user.id',
        'user.username',
        'user.name',
        'user.email',
        'user.phoneNumber',
        'user.avatarUrl',
        'user.roles',
        'user.createdAt',
        'user.updatedAt',
        'user.type',
    ];

    private readonly SELECT_POST_SCOPE = [
        'post.id',
        'post.title',
        'post.subTitle',
        'post.featuredImage',
        'post.createdAt',
        'post.updatedAt',
    ];

    private readonly SELECT_QUESTION_SCOPE = [
        'question.id',
        'question.title',
        'question.createdAt',
        'question.updatedAt',
    ];

    private readonly TOTALLY_SELECT_USER_SCOPE = [
        ...this.SELECT_USER_SCOPE,
        ...this.SELECT_POST_SCOPE,
        ...this.SELECT_QUESTION_SCOPE,
        'pTag.id',
        'pTag.name',
        'qTag.id',
        'qTag.name',
    ];

    getUserById(id: string): Promise<UserEntity> {
        try {
            return this.createQueryBuilder('user')
                .leftJoinAndSelect('user.questions', 'question')
                .leftJoinAndSelect('user.posts', 'post')
                .leftJoinAndSelect('post.tags', 'pTag')
                .leftJoinAndSelect('question.tags', 'qTag')
                .select(this.TOTALLY_SELECT_USER_SCOPE)
                .where('user.id = :id', { id })
                .getOne();
        } catch (e) {
            console.error(e);
        }
    }

    async getAllUsers({
        order,
        limit,
        page,
    }: Partial<PaginateParams>): Promise<EntityResults<UserEntity>> {
        try {
            const [entities, count] = await this.createQueryBuilder('user')
                .leftJoinAndSelect('user.questions', 'question')
                .leftJoinAndSelect('user.posts', 'post')
                .leftJoinAndSelect('post.tags', 'pTag')
                .leftJoinAndSelect('question.tags', 'qTag')
                .select(this.TOTALLY_SELECT_USER_SCOPE)
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

    search(key: string): Promise<UserEntity[]> {
        try {
            return this.createQueryBuilder('user')
                .where('user.username ILIKE :key', { key: `%${key}%` })
                .orWhere('user.name ILIKE :key', { key: `%${key}%` })
                .orWhere('user.email ILIKE :key', { key: `%${key}%` })
                .select(this.SELECT_USER_SCOPE)
                .getMany();
        } catch (e) {
            console.error(e);
        }
    }
}
