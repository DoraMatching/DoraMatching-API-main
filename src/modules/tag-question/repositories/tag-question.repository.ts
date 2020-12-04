import { EntityResults } from '@/commons';
import { PaginateParams } from '@/shared';
import { TagQuestionEntity } from '@tag-question/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TagQuestionEntity)
export class TagQuestionRepository extends Repository<TagQuestionEntity> {
    private readonly SELECT_TAG_QUESTION_SCOPE = [
        'tag',
        'question',
        'author.id',
        'author.avatarUrl',
        'author.name',
        'author.roles',
        'author.type',
    ];

    async createTagByName(tagName: string): Promise<TagQuestionEntity> {
        try {
            const tag = new TagQuestionEntity();
            tag.name = tagName;
            return await this.save(tag);
        } catch (e) {
            console.error(e);
        }
    }

    async getTagByName(tagName: string): Promise<TagQuestionEntity> {
        try {
            return await this.findOne({ where: { name: tagName } });
        } catch (e) {
            console.error(e);
        }
    }

    async createIfNotExists(tagName): Promise<TagQuestionEntity> {
        try {
            const tag = await this.getTagByName(tagName);
            if (tag) return tag;
            else return this.createTagByName(tagName);
        } catch (e) {
            console.error(e);
        }
    }

    async findManyAndCreateIfNotExisted(
        tagNames: string[],
    ): Promise<TagQuestionEntity[]> {
        const tagPromises = tagNames.map(name => this.createIfNotExists(name));
        try {
            return await Promise.all(tagPromises);
        } catch (e) {
            console.error(e);
        }
    }

    async getAllTags({
        order,
        limit,
        page,
    }: Partial<PaginateParams>): Promise<EntityResults<TagQuestionEntity>> {
        try {
            const [entities, count] = await this.createQueryBuilder('tag')
                .leftJoinAndSelect('tag.questions', 'question')
                .leftJoinAndSelect('question.author', 'author')
                .select(this.SELECT_TAG_QUESTION_SCOPE)
                .orderBy('tag.createdAt', order)
                .skip(limit * (page - 1))
                .take(limit)
                .getManyAndCount();
            return { entities, count };
        } catch (e) {
            console.error(e);
        }
    }
}
