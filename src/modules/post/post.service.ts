import { AppResources } from '@/app.roles';
import { BaseService } from '@/commons';
import {
    customPaginate,
    grantPermission,
    IDeleteResultDTO,
    IPagination,
    paginateFilter,
    PaginateParams,
} from '@/shared';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDTO, IPostRO, PostRO, UpdatePostDTO } from '@post/dto';
import { PostEntity } from '@post/entities';
import { PostRepository } from '@post/repositories';
import { TagPostRepository } from '@tag-post/repositories';
import { JwtUser } from '@user/dto';
import { UserRepository } from '@user/repositories';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

@Injectable()
export class PostService extends BaseService<PostEntity, PostRepository> {
    constructor(
        private readonly postRepository: PostRepository,
        private readonly tagPostRepository: TagPostRepository,
        private readonly userRepository: UserRepository,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ) {
        super(postRepository);
    }

    async deletePostById(
        postId: string,
        jwtUser: JwtUser,
    ): Promise<IDeleteResultDTO> {
        const foundPost = await this.getPostById(postId, jwtUser);
        if (!foundPost)
            throw new HttpException(
                `Post with id: ${postId} not found!`,
                HttpStatus.NOT_FOUND,
            );
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.POST,
            'delete',
            jwtUser,
            foundPost.author.id,
        );
        if (permission.granted) {
            await this.postRepository.delete(postId);
            return {
                message: `Deleted post with id: ${foundPost.id}.`,
            };
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async createPost(
        { tags, ...data }: CreatePostDTO,
        jwtUser: JwtUser,
    ): Promise<IPostRO> {
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.POST,
            'create',
            jwtUser,
            null,
        );
        if (permission.granted) {
            const [user, _tags] = await Promise.all([
                this.userRepository.findOne({
                    where: { id: jwtUser.id },
                    select: ['id', 'name', 'username', 'email'],
                }),
                this.tagPostRepository.findManyAndCreateIfNotExisted(
                    tags.map(tag => tag.name),
                ),
            ]);
            if (!user)
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            data = permission.filter(data);
            const newPost = this.postRepository.create({
                ...data,
                author: user,
                tags: _tags,
            });

            try {
                const _post = await this.postRepository.save(newPost);
                return await this.postRepository.getPostById(_post.id);
            } catch ({ detail }) {
                throw new HttpException(
                    detail || `OOPS! Can't create post`,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async getAllPosts(
        pagOpts: PaginateParams,
        jwtUser: JwtUser,
    ): Promise<IPagination<IPostRO>> {
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.POST,
            'read',
            jwtUser,
            null,
        );
        if (permission.granted) {
            try {
                const data = await this.postRepository.getAllPosts(pagOpts);
                const result = customPaginate<PostRO>(data, pagOpts);
                return paginateFilter(result, permission);
            } catch ({ detail }) {
                throw new HttpException(
                    detail || 'OOPS!',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async getPostById(postId: string, jwtUser: JwtUser): Promise<IPostRO> {
        const foundPost = await this.postRepository.getPostById(postId);
        if (!foundPost)
            throw new HttpException(
                `Post with id: ${postId} not found!`,
                HttpStatus.NOT_FOUND,
            );
        else {
            const permission = grantPermission(
                this.rolesBuilder,
                AppResources.POST,
                'read',
                jwtUser,
                foundPost.author.id,
            );
            if (permission.granted) {
                return permission.filter(foundPost);
            } else
                throw new HttpException(
                    `You don't have permission for this!`,
                    HttpStatus.FORBIDDEN,
                );
        }
    }

    async updatePostById(
        id: string,
        data: UpdatePostDTO,
        jwtUser: JwtUser,
    ): Promise<IPostRO> {
        const post = await this.getPostById(id, jwtUser);
        if (!post)
            throw new HttpException(
                `Post with id: ${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.POST,
            'update',
            jwtUser,
            post.author.id,
        );
        if (permission.granted) {
            data = permission.filter(data);
            Object.assign(post, data);
            if (data.tags)
                post.tags = await this.tagPostRepository.findManyAndCreateIfNotExisted(
                    data.tags.map(tag => tag.name),
                );
            try {
                await this.postRepository.save(post);
                const result = await this.postRepository.getPostById(id);
                return permission.filter(result);
            } catch ({ detail }) {
                throw new HttpException(
                    detail || `OOPS! Can't update post`,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }
}
