import { AppResources } from '@/app.roles';
import { BaseService } from '@/commons/base-service';
import { isEnableCache } from '@/config/database.config';
import { grantPermission } from '@/shared/access-control/grant-permission';
import { customPaginate } from '@/shared/pagination/paginate-custom';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdatePostDTO } from '@post/dto/update-post.dto';
import { IPagination, paginateFilter, paginateOrder, PaginateParams } from '@shared/pagination';
import { JwtUser } from '@user/dto/';
import { UserRepository } from '@user/repositories/user.repository';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { paginate } from 'nestjs-typeorm-paginate';
import { CreatePostDTO, PostRO } from './dto';
import { PostEntity } from './entity/post.entity';
import { PostRepository } from './repositories/post.repository';

@Injectable()
export class PostService extends BaseService<PostEntity, PostRepository> {
    constructor(
        private readonly postRepository: PostRepository,
        private readonly userRepository: UserRepository,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder
    ) {
        super(postRepository);
    }

    async deletePostById(id: string) {
        return this.postRepository.delete(id);
    }

    async showAll({ limit, page, order, route }: PaginateParams): Promise<IPagination<PostRO>> {
        const result = await paginate<PostEntity>(this.postRepository, {
            limit,
            page,
            route,
        }, { order: { createdAt: order }, relations: ['author'], cache: isEnableCache });
        return paginateOrder(result, order);
    }

    async createPost(data: CreatePostDTO, { id }: JwtUser): Promise<PostRO> {
        const user = await this.userRepository.findOne({ where: { id }, select: ['id', 'name', 'username', 'email'] });
        const newPost = this.postRepository.create({
            ...data,
            author: user,
        });
        try {
            await this.postRepository.save(newPost);
        } catch ({ detail }) {
            throw new HttpException(detail || 'oops!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return newPost;
    }

    async getAllPosts(pagOpts: PaginateParams, jwtUser: JwtUser): Promise<IPagination<PostRO>> {
        const permission = grantPermission(this.rolesBuilder, AppResources.POST, 'read', jwtUser, null);
        if (permission.granted) {
            const data = await this.postRepository.getAllPosts(pagOpts);
            const result = customPaginate<PostRO>(data, pagOpts);
            return paginateFilter(result, permission);
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    async findOne(id: string): Promise<PostRO> {
        const foundPost = await this.postRepository.getPost(id);
        if (!foundPost) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        else return foundPost;
    }

    async updatePost(id: string, data: UpdatePostDTO): Promise<PostRO> {
        try {
            await this.postRepository.update(id, data);
        } catch ({ detail }) {
            throw new HttpException(detail || 'oops!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return this.postRepository.getPost(id);
    }
}
