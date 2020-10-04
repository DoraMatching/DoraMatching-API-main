import { EntityRepository, Repository } from 'typeorm';
import { TagPostEntity } from '../entity/tag-post.entity';

@EntityRepository(TagPostEntity)
export class TagPostRepository extends Repository<TagPostEntity> {
    
}