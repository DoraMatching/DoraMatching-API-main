import { EntityResults } from '@/commons/entity-results';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginateParams } from '@shared/pagination';
import { EntityRepository, Repository } from 'typeorm';
import { TagPostEntity } from '../entity/tag-post.entity';

@EntityRepository(TagPostEntity)
export class TagPostRepository extends Repository<TagPostEntity> {
    private readonly SELECT_TAG_POST_SCOPE = [
        'tag',
        'post.id',
        'post.title',
        'post.featuredImage',
    ];


    async getTagByName(tagName: string) {
        try {
            return await this.findOne({ where: { name: tagName } });
        } catch ({ detail }) {
            throw new HttpException(detail || 'OOPS!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createTagByName(tagName: string): Promise<TagPostEntity> {
        try {
            const tag = new TagPostEntity();
            tag.name = tagName;
            return await this.save(tag);
        } catch ({ detail }) {
            throw new HttpException(detail || 'OOPS!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createIfNotExists(tagName): Promise<TagPostEntity> {
        try {
            const tag = await this.getTagByName(tagName);
            if (tag) return tag;
            else return this.createTagByName(tagName);
        } catch ({ detail }) {
            throw new HttpException(detail || 'OOPS!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findManyAndCreateIfNotExisted(tagNames: string[]): Promise<TagPostEntity[]> {
        const tagPromises = tagNames.map(name => this.createIfNotExists(name));
        try {
            return await Promise.all(tagPromises);
        } catch ({ detail }) {
            throw new HttpException(detail || 'OOPS!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllTags({ order, limit, page }: Partial<PaginateParams>): Promise<EntityResults<TagPostEntity>> {
        try {
            const [entities, count] = await this.createQueryBuilder('tag')
              .leftJoinAndSelect('tag.posts', 'post')
              .select(this.SELECT_TAG_POST_SCOPE)
              .orderBy('tag.createdAt', order)
              .skip(limit * (page - 1))
              .take(limit)
              .getManyAndCount();
            return { entities, count };
        } catch ({ detail, ...e }) {
            throw new HttpException(detail || `OOPS! Can't get all tags`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // async getTagById(tagId: string, { order, limit, page }: Partial<PaginateParams>): Promise<EntityResults<TagPostEntity>> {
    //     try {
    //         const [entities, count] = await this.createQueryBuilder('tag')
    //           .leftJoinAndSelect('tag.posts', 'post')
    //           .select(this.SELECT_TAG_POST_SCOPE)
    //           .where('tag.id = :tagId', { tagId })
    //           .orderBy('tag.createdAt', order)
    //           .skip(limit * (page - 1))
    //           .take(limit)
    //           .getManyAndCount();
    //         return { entities, count };
    //     } catch ({ detail, ...e }) {
    //         throw new HttpException(detail || `OOPS! Can't get all tags`, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
}
