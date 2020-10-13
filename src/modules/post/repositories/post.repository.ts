import { EntityResults } from '@/commons/entity-results';
import { PaginateParams } from '@/shared/pagination';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TagPostRepository } from '@tag-post/repositories/tag-post.repository';
import { TagPostService } from '@tag-post/tag-post.service';
import { EntityRepository, Repository } from 'typeorm';
import { PostEntity } from '../entity/post.entity';

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
            throw new HttpException(detail || 'OOPS!', HttpStatus.INTERNAL_SERVER_ERROR);
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
            throw new HttpException(detail || `OOPS! Can't get post by ID`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // async getAllPostByTagId(tagId: string, { order, limit, page }: Partial<PaginateParams>): Promise<EntityResults<PostEntity>> {
    //     try {
    //         const foundTag = await this.tagPostService.getAllPostByTagId(tagId, {order, limit, page});
    //
    //         console.log(foundTag);
    //
    //         const ids = foundTag.posts.map(post => post.id);
    //
    //         const posts = await this.findByIds(ids);
    //
    //         return { entities: posts, count: ids.length };
    //     } catch ({ detail }) {
    //         throw new HttpException(detail || `OOPS! Can't get posts by tag id`, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
}
