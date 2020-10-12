import { Injectable } from '@nestjs/common';
import { CreateTagPostDTO, TagPostRO } from './dto';
import { TagPostRepository } from './repositories/tag-post.repository';

@Injectable()
export class TagPostService {
    constructor(private readonly tagPostRepository: TagPostRepository) { }

    async createTagPost(data: CreateTagPostDTO): Promise<TagPostRO> {
        const newTag = this.tagPostRepository.create(data);
        return await this.tagPostRepository.save(newTag);
    }
}
