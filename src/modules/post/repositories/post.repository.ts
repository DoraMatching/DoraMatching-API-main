import { EntityResults } from '@/commons/entity-results';
import { PaginateParams } from '@/shared/pagination';
import { EntityRepository, Repository } from 'typeorm';
import { PostEntity } from '../entity/post.entity';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
    async getAllPosts({ order, limit, page }: Partial<PaginateParams>): Promise<EntityResults<PostEntity>> {
        // const [entities, count] = await this.createQueryBuilder('post')
        //   .leftJoinAndSelect('post.author', 'user')
        //   .leftJoinAndSelect('post.tag', 'tag')
        //   .select([
        //       'post',
        //       'user.id',
        //       'user.name',
        //       'user.roles',
        //       'user.avatarUrl',
        //       'tag.id',
        //       'tag.name',
        //   ])
        //   .orderBy('post.createdAt', order)
        //   .skip(limit * (page - 1))
        //   .take(limit)
        //   .getManyAndCount();
        // return { entities, count };
        const [entities, count] = await this.find({
            relations: ['author', 'tags'],
            select: [
                'post',
                'user.id',
                'user.name',
                'user.roles',
                'user.avatarUrl',
                'tag.id',
                'tag.name',
            ]
            skip: limit * (page - 1),
            take: limit,
        });
    }

    async getPost(id: string): Promise<PostEntity> {
        return await this.createQueryBuilder('post')
          .leftJoinAndSelect('post.author', 'user')
          .select([
              'post',
              'user.id',
              'user.name',
              'user.roles',
              'user.avatarUrl',
          ])
          .where('post.id = :id', { id })
          .getOne();
    }
}
