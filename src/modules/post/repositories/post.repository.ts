import { EntityResults } from '@/commons/entity-results';
import { PaginateParams } from '@/shared/pagination';
import { EntityRepository, Repository } from 'typeorm';
import { PostEntity } from '../entity/post.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
    private readonly SELECT_POST_SCOPE = [
        'post',
        'user.id',
        'user.name',
        'user.roles',
        'user.avatarUrl',
        'tag.id',
        'tag.name',
    ];

    async getAllPosts({ order, limit, page }: Partial<PaginateParams>): Promise<EntityResults<PostEntity>> {
        try {
            const [entities, count] = await this.createQueryBuilder('post')
              .leftJoinAndSelect('post.author', 'user')
              .leftJoinAndSelect('post.tags', 'tag')
              .select(this.SELECT_POST_SCOPE)
              .orderBy('post.createdAt', order)
              .skip(limit * (page - 1))
              .take(limit)
              .getManyAndCount();
            return { entities, count };
        } catch ({ detail }) {
            throw new HttpException(detail || 'oops!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getPost(id: string): Promise<PostEntity> {
        try {
            return await this.createQueryBuilder('post')
              .leftJoinAndSelect('post.author', 'user')
              .leftJoinAndSelect('post.tags', 'tag')
              .select(this.SELECT_POST_SCOPE)
              .where('post.id = :id', { id })
              .getOne();
        } catch ({ detail }) {
            throw new HttpException(detail || 'oops!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
