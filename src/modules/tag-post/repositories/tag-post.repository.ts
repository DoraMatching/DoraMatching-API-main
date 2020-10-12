import { EntityRepository, Repository } from 'typeorm';
import { TagPostEntity } from '../entity/tag-post.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@EntityRepository(TagPostEntity)
export class TagPostRepository extends Repository<TagPostEntity> {
    async getTagByName(tagName: string) {
        try {
            return await this.findOne({ where: { name: tagName } });
        } catch ({ detail }) {
            throw new HttpException(detail || 'oops!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createTagByName(tagName: string): Promise<TagPostEntity> {
        try {
            const tag = new TagPostEntity();
            tag.name = tagName;
            return await this.save(tag);
        } catch ({ detail }) {
            throw new HttpException(detail || 'oops!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createIfNotExists(tagName): Promise<TagPostEntity> {
        try {
            const tag = await this.getTagByName(tagName);
            if (tag) return tag;
            else return this.createTagByName(tagName);
        } catch ({ detail }) {
            throw new HttpException(detail || 'oops!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findManyAndCreateIfNotExisted(tagNames: string[]): Promise<TagPostEntity[]> {
        const tagPromises = tagNames.map(name => this.createIfNotExists(name));
        try {
            return await Promise.all(tagPromises);
        } catch ({ detail }) {
            throw new HttpException(detail || 'oops!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
