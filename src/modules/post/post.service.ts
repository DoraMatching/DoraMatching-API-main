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
import { TagPostRepository } from '@tag-post/repositories/tag-post.repository';

@Injectable()
export class PostService extends BaseService<PostEntity, PostRepository> {
    constructor(
      private readonly postRepository: PostRepository,
      private readonly userRepository: UserRepository,
      private readonly tagPostRepository: TagPostRepository,
      @InjectRolesBuilder()
      private readonly rolesBuilder: RolesBuilder,
    ) {
        super(postRepository);
    }

    async deletePostById(id: string, jwtUser: JwtUser) {
        const foundPost = await this.findOne(id, jwtUser);

        const permissions = grantPermission(this.rolesBuilder, AppResources.POST, 'delete', jwtUser, foundPost.author.id);
        if (permissions.granted) {
            await this.postRepository.delete(id);
            return {
                message: `Delete post with id: ${foundPost.id}`,
            };
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    async showAll({ limit, page, order, route }: PaginateParams): Promise<IPagination<PostRO>> {
        const result = await paginate<PostEntity>(this.postRepository, {
            limit,
            page,
            route,
        }, { order: { createdAt: order }, relations: ['author'], cache: isEnableCache });
        return paginateOrder(result, order);
    }

    async createPost({ tags, ...data }: CreatePostDTO, jwtUser: JwtUser): Promise<PostRO> {

        try {
            const [user, _tags] = await Promise.all([
                this.userRepository.findOne({
                    where: { id: jwtUser.id },
                    select: ['id', 'name', 'username', 'email'],
                }),
                this.tagPostRepository.findManyAndCreateIfNotExisted(tags.map(tag => tag.name)),
            ]);
            const newPost = this.postRepository.create({
                ...data,
                author: user,
                tags: _tags,
            });
            console.log(newPost);
            await this.postRepository.save(newPost);
            return newPost;
        } catch ({ detail, ...errors }) {
            console.log('ERRORS', errors);
            throw new HttpException(detail || 'oops!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllPosts(pagOpts: PaginateParams, jwtUser: JwtUser): Promise<IPagination<PostRO>> {
        const permission = grantPermission(this.rolesBuilder, AppResources.POST, 'read', jwtUser, null);
        if (permission.granted) {
            try {
                const data = await this.postRepository.getAllPosts(pagOpts);
                const result = customPaginate<PostRO>(data, pagOpts);
                return paginateFilter(result, permission);
            } catch ({ detail }) {
                throw new HttpException(detail || 'oops!', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    async findOne(id: string, jwtUser: JwtUser): Promise<PostRO> {
        const foundPost = await this.postRepository.getPost(id);
        if (!foundPost) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        else {
            const permissions = grantPermission(this.rolesBuilder, AppResources.POST, 'read', jwtUser, foundPost.author.id);
            if (permissions.granted) {
                return permissions.filter(foundPost);
            } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
        }
    }

    async updatePost(id: string, data: UpdatePostDTO, jwtUser: JwtUser): Promise<PostRO> {
        const post = await this.findOne(id, jwtUser);
        const permissions = grantPermission(this.rolesBuilder, AppResources.POST, 'update', jwtUser, post.author.id);
        if (permissions.granted) {
            try {
                await this.postRepository.update(id, data);
                const result = await this.postRepository.getPost(id);
                return permissions.filter(result);
            } catch ({ detail }) {
                throw new HttpException(detail || 'oops!', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }
}
