import { BaseService } from '@/commons/base-service';
import { isEnableCache } from '@/config/database.config';
import { customPaginate } from '@/shared/pagination/paginate-custom';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IPagination, paginateOrder, PaginateParams } from '@shared/pagination';
import { JwtUser } from '@user/dto/';
import { UserRepository } from '@user/repositories/user.repository';
import { paginate } from 'nestjs-typeorm-paginate';
import { CreatePostDTO, PostRO } from './dto';
import { PostEntity } from './entity/post.entity';
import { PostRepository } from './repositories/post.repository';
import { UpdatePostDTO } from '@post/dto/update-post.dto';

@Injectable()
export class PostService extends BaseService<PostEntity, PostRepository> {
    constructor(
      private readonly postRepository: PostRepository,
      private readonly userRepository: UserRepository,
    ) {
        super(postRepository);
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
            throw new HttpException(detail, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return newPost;
    }

    async getAllPosts(pagOpts: PaginateParams): Promise<IPagination<PostRO>> {
        const data = await this.postRepository.getAllPosts(pagOpts);
        return customPaginate<PostRO>(data, pagOpts);
    }

    findOne(id: string): Promise<PostRO> {
        return this.postRepository.findOne({ where: { id }, relations: ['author'] });
    }

    async updatePost(id: string, data: UpdatePostDTO): Promise<PostRO> {
        try {
            await this.postRepository.update(id, data);
        } catch ({ detail }) {
            throw new HttpException(detail, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return this.postRepository.getPost(id);
    }
}
