import { isEnableCache } from '@/config/database.config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPagination, paginateOrder, PaginateParams } from '@shared/pagination';
import { JwtUser } from '@user/dto/';
import { UserEntity } from '@user/entity/user.entity';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { UserRepository } from '../user/repositories/user.repository';
import { CreatePostDTO, PostRO } from './dto';
import { PostEntity } from './entity/post.entity';
import { PostRepository } from './repositories/post.repository';

@Injectable()
export class PostService {
    constructor(
        private readonly postRepository: PostRepository,
        private readonly userRepository: UserRepository
    ) { }

    async showAll({ limit, page, order, route }: PaginateParams): Promise<IPagination<PostRO>> {
        const result = await paginate<PostEntity>(this.postRepository, { limit, page, route }, { order: { createdAt: order }, relations: ['author'], cache: isEnableCache });
        return paginateOrder(result, order);
    }

    async createPost(data: CreatePostDTO, { id }: JwtUser): Promise<PostRO> {
        const user = await this.userRepository.findOne({ where: { id }, select: ['id', 'name', 'username', 'email'] });
        const newPost = this.postRepository.create({
            ...data,
            author: user
        });
        try {
            await this.postRepository.save(newPost);
        } catch ({ detail }) {
            throw new HttpException(detail, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return newPost;
    }
}
