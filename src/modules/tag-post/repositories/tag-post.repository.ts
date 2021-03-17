import { EntityResults } from '@/commons';
import { PaginateParams } from '@/shared';
import { TagPostEntity } from '@tag-post/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TagPostEntity)
export class TagPostRepository extends Repository<TagPostEntity> {
    private readonly SELECT_TAG_POST_SCOPE = [
        'tag',
        'post.id',
        'post.featuredImage',
        'post.subTitle',
        'post.title',
        'post.type',
        'author.id',
        'author.avatarUrl',
        'author.name',
        'author.roles',
        'author.type',
    ];

    async getTagByName(tagName: string) {
        try {
            return await this.findOne({ where: { name: tagName } });
        } catch (e) {
            console.error(e);
        }
    }

    async createTagByName(tagName: string): Promise<TagPostEntity> {
        try {
            const tag = new TagPostEntity();
            tag.name = tagName;
            return await this.save(tag);
        } catch (e) {
            console.error(e);
        }
    }

    async createIfNotExists(tagName): Promise<TagPostEntity> {
        try {
            const tag = await this.getTagByName(tagName);
            if (tag) return tag;
            else return this.createTagByName(tagName);
        } catch (e) {
            console.error(e);
        }
    }

    async findManyAndCreateIfNotExisted(tagNames: string[]): Promise<TagPostEntity[]> {
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
    }: Partial<PaginateParams>): Promise<EntityResults<TagPostEntity>> {
        try {
            const [entities, count] = await this.createQueryBuilder('tag')
                .leftJoinAndSelect('tag.posts', 'post')
                .leftJoinAndSelect('post.author', 'author')
                .select(this.SELECT_TAG_POST_SCOPE)
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
