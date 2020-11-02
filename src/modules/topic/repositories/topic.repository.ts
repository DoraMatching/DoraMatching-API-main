import { EntityResults } from '@/commons/entity-results';
import { PaginateParams } from '@shared/pagination/paginate.params';
import { EntityRepository, Repository } from 'typeorm';
import { TopicEntity } from '../entities/topic.entity';

@EntityRepository(TopicEntity)
export class TopicRepository extends Repository<TopicEntity> {
    private readonly SELECT_TOPIC_SCOPE = [
        'topic',
        'author.id',
        'author.avatarUrl',
        'author.name',
        'author.roles',
        'author.type',
    ];

    async getAllTopics({ order, limit, page }: Partial<PaginateParams>): Promise<EntityResults<TopicEntity>> {
        try {
            const [entities, count] = await this.createQueryBuilder('topic')
                .leftJoinAndSelect('topic.author', 'author')
                .orderBy('author.createdAt', order)
                .skip(limit * (page - 1))
                .take(limit)
                .getManyAndCount();
            return { entities, count };

        } catch (e) {
            console.error(e);
        }
    }

    async getTopicById(id: string): Promise<TopicEntity> {
        try {
            return await this.createQueryBuilder('topic')
                .leftJoinAndSelect('topic.author', 'author')
                .select(this.SELECT_TOPIC_SCOPE)
                .where('topic.id = :id', { id })
                .getOne();
        } catch (e) {
            console.error(e);
        }
    }
}