import { EntityRepository, Repository } from 'typeorm';
import { PaginateParams } from '@/shared';
import { EntityResults } from '@/commons';
import { Logger } from '@nestjs/common';
import { PostEntity } from '@post/entities';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
    private logger: Logger = new Logger(PostRepository.name);

    private readonly SELECT_POST_SCOPE = [
        'post',
        'author.id',
        'author.avatarUrl',
        'author.name',
        'author.roles',
        'author.type',
        'tag.id',
        'tag.name',
        'tag.type',
        'comments',
        'commentAuthor.id',
        'commentAuthor.avatarUrl',
        'commentAuthor.name',
        'commentAuthor.roles',
        'commentAuthor.type'
    ];

    async getAllPosts({ order, limit, page }: Partial<PaginateParams>): Promise<EntityResults<PostEntity>> {
        try {
            const [entities, count] = await this.createQueryBuilder('post')
              .leftJoinAndSelect('post.author', 'author')
              .leftJoinAndSelect('post.tags', 'tag')
              .leftJoinAndSelect('post.comments', 'comments')
              .leftJoinAndSelect('comments.author', 'commentAuthor')
              .select(this.SELECT_POST_SCOPE)
              .orderBy('post.createdAt', order)
              .skip(limit * (page - 1))
              .take(limit)
              .getManyAndCount();
            return { entities, count };
        } catch (e) {
            console.error(e);
        }
    }

    async getPostById(id: string): Promise<PostEntity> {
        try {
            return await this.createQueryBuilder('post')
              .leftJoinAndSelect('post.author', 'author')
              .leftJoinAndSelect('post.tags', 'tag')
              .leftJoinAndSelect('post.comments', 'comments')
              .leftJoinAndSelect('comments.author', 'commentAuthor')
              .select(this.SELECT_POST_SCOPE)
              .where('post.id = :id', { id })
              .orderBy('comments.createdAt', 'DESC')
              .getOne();
        } catch (e) {
            console.error(e);
        }
    }
}
