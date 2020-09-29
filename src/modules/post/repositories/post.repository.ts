import { PaginateParams } from '@/shared/pagination';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { PostEntity } from '../entity/post.entity';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity>{
    getAllPost(): SelectQueryBuilder<PostEntity> {
        return this.createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'user')
            .select([
                'post',
                'user.id',
                'user.name',
                'user.roles'
            ]);
    }
}