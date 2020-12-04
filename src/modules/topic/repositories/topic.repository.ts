import { EntityResults } from '@/commons';
import { PaginateParams } from '@/shared';
import { TopicEntity } from '@topic/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TopicEntity)
export class TopicRepository extends Repository<TopicEntity> {
    private readonly SELECT_TOPIC_SCOPE = [
        'topic',
        'trainer',
        'user.id',
        'user.avatarUrl',
        'user.name',
        'user.roles',
        'user.type',
    ];

    async getAllTopics({
        order,
        limit,
        page,
    }: Partial<PaginateParams>): Promise<EntityResults<TopicEntity>> {
        try {
            const [entities, count] = await this.createQueryBuilder('topic')
                .leftJoinAndSelect('topic.author', 'trainer')
                .leftJoinAndSelect('trainer.user', 'user')
                .select(this.SELECT_TOPIC_SCOPE)
                .orderBy('topic.createdAt', order)
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
                .leftJoinAndSelect('topic.author', 'trainer')
                .leftJoinAndSelect('trainer.user', 'user')
                .select(this.SELECT_TOPIC_SCOPE)
                .where('topic.id = :id', { id })
                .getOne();
        } catch (e) {
            console.error(e);
        }
    }
}
