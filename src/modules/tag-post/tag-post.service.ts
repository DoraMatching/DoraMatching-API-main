import { AppResources } from '@/app.roles';
import { BaseService } from '@/commons/base-service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { grantPermission } from '@shared/access-control/grant-permission';
import { customPaginate, IPagination, paginateFilter, PaginateParams } from '@shared/pagination';
import { TagPostEntity } from '@tag-post/entity/tag-post.entity';
import { JwtUser } from '@user/dto';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { CreateTagPostDTO, TagPostRO } from './dto';
import { TagPostRepository } from './repositories/tag-post.repository';

@Injectable()
export class TagPostService extends BaseService<TagPostEntity, TagPostRepository> {
    constructor(
        private readonly tagPostRepository: TagPostRepository,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ) {
        super(tagPostRepository);
    }

    async createTagPost(data: CreateTagPostDTO): Promise<TagPostRO> {
        const newTag = this.tagPostRepository.create(data);
        return await this.tagPostRepository.save(newTag);
    }

    async getAllTags(pagOpts: PaginateParams, jwtUser: JwtUser): Promise<IPagination<TagPostRO>> {
        const permission = grantPermission(this.rolesBuilder, AppResources.TAG_POST, 'read', jwtUser, null);
        if (permission.granted) {
            try {
                const data = await this.tagPostRepository.getAllTags(pagOpts);
                const result = customPaginate<TagPostRO>(data, pagOpts);
                return paginateFilter(result, permission);
            } catch ({ detail }) {
                throw new HttpException(detail || `Oops! Can't get all tags`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    // async getAllPostByTagId(tagId: string, pagOpts: PaginateParams, jwtUser: JwtUser): Promise<IPagination<PostRO>> {
    //     const permission = grantPermission(this.rolesBuilder, AppResources.POST, 'read', jwtUser, null);
    //     if (permission.granted) {
    //         try {
    //             const data = await this.postRepository.getAllPostByTagId(tagId, pagOpts);
    //             const result = customPaginate<PostRO>(data, pagOpts);
    //             return paginateFilter(result, permission);
    //         } catch ({ detail }) {
    //             throw new HttpException(detail || `Oops! Can't get posts by tag id`, HttpStatus.INTERNAL_SERVER_ERROR);
    //         }
    //     } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    // }
}
