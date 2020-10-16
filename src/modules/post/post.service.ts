import { AppResources } from '@/app.roles';
import { BaseService } from '@/commons/base-service';
import { isEnableCache } from '@/config/database.config';
import { grantPermission } from '@/shared/access-control/grant-permission';
import { customPaginate } from '@/shared/pagination/paginate-custom';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UpdatePostDTO } from '@post/dto/update-post.dto';
import { IDeleteResultDTO } from '@shared/dto/';
import { IPagination, paginateFilter, paginateOrder, PaginateParams } from '@shared/pagination';
import { TagPostRepository } from '@tag-post/repositories/tag-post.repository';
import { JwtUser } from '@user/dto/';
import { UserRepository } from '@user/repositories/user.repository';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { paginate } from 'nestjs-typeorm-paginate';
import { CreatePostDTO, IPostRO, PostRO } from './dto';
import { PostEntity } from './entity/post.entity';
import { PostRepository } from './repositories/post.repository';

@Injectable()
export class PostService extends BaseService<PostEntity, PostRepository> {
    private readonly logger: Logger = new Logger(PostService.name);

    constructor(
      private readonly postRepository: PostRepository,
      private readonly userRepository: UserRepository,
      private readonly tagPostRepository: TagPostRepository,
      @InjectRolesBuilder()
      private readonly rolesBuilder: RolesBuilder,
    ) {
        super(postRepository);
    }

    async deletePostById(id: string, jwtUser: JwtUser): Promise<IDeleteResultDTO> {
        const foundPost = await this.getPostById(id, jwtUser);

        const permissions = grantPermission(this.rolesBuilder, AppResources.POST, 'delete', jwtUser, foundPost.author.id);
        if (permissions.granted) {
            await this.postRepository.delete(id);
            return {
                message: `Deleted post with id: ${foundPost.id}.`,
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
        const permission = grantPermission(this.rolesBuilder, AppResources.POST, 'create', jwtUser, null);
        if (permission.granted) {
            const [user, _tags] = await Promise.all([
                this.userRepository.findOne({
                    where: { id: jwtUser.id },
                    select: ['id', 'name', 'username', 'email'],
                }),
                this.tagPostRepository.findManyAndCreateIfNotExisted(tags.map(tag => tag.name)),
            ]);
            if (!user) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            data = permission.filter(data);
            const newPost = this.postRepository.create({
                ...data,
                author: user,
                tags: _tags,
            });

            try {
                await this.postRepository.save(newPost);
                return newPost;
            } catch ({ detail }) {
                throw new HttpException(detail || `OOPS! Can't create post`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    async getAllPosts(pagOpts: PaginateParams, jwtUser: JwtUser): Promise<IPagination<PostRO>> {
        const permission = grantPermission(this.rolesBuilder, AppResources.POST, 'read', jwtUser, null);
        if (permission.granted) {
            try {
                const data = await this.postRepository.getAllPosts(pagOpts);
                const result = customPaginate<PostRO>(data, pagOpts);
                return paginateFilter(result, permission);
            } catch ({ detail }) {
                throw new HttpException(detail || 'OOPS!', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    async getPostById(id: string, jwtUser: JwtUser): Promise<IPostRO> {
        const foundPost = await this.postRepository.getPostById(id);
        console.log(foundPost);
        if (!foundPost) throw new HttpException(`Post with id: ${id} not found!`, HttpStatus.NOT_FOUND);
        else {
            const permissions = grantPermission(this.rolesBuilder, AppResources.POST, 'read', jwtUser, foundPost.author.id);
            if (permissions.granted) {
                const result = permissions.filter(foundPost);
                this.logger.debug(result);
                return result;
            } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
        }
    }

    async updatePost(id: string, data: UpdatePostDTO, jwtUser: JwtUser): Promise<PostRO> {
        const post = await this.getPostById(id, jwtUser);
        const permissions = grantPermission(this.rolesBuilder, AppResources.POST, 'update', jwtUser, post.author.id);
        if (permissions.granted) {
            try {
                post.title = data.title;
                post.subTitle = data.subTitle;
                post.featuredImage = data.featuredImage;
                post.content = data.content;
                post.tags = await this.tagPostRepository.findManyAndCreateIfNotExisted(data.tags.map(tag => tag.name));
                await this.postRepository.save(post);
                const result = await this.postRepository.getPostById(id);
                return permissions.filter(result);
            } catch ({ detail, message }) {
                this.logger.error(message);
                throw new HttpException(detail || `OOPS! Can't update post`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }
}
