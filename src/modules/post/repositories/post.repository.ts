import { EntityResults } from '@/commons/entity-results';
import { PaginateParams } from '@/shared/pagination';
import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { PostEntity } from '../entities/post.entity';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
    private logger: Logger = new Logger(PostRepository.name);

    private readonly SELECT_POST_SCOPE = [
        'post',
        'author.id',
        'author.name',
        'author.roles',
        'author.avatarUrl',
        'author.type',
        'tag.id',
        'tag.name',
        'tag.type',
        'comments',
        'commentAuthor.id',
        'commentAuthor.name',
        'commentAuthor.avatarUrl',
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
