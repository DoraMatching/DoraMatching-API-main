import { isEnableCache } from '@/config/database.config';
import { JwtUser } from '@/modules/user/dto/';
import { IPagination, paginateOrder, PaginateParams } from '@/shared/pagination';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { CreatePostDTO, PostRO } from './dto';
import { PostEntity } from './entity/post.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async showAll({ limit, page, order, route }: PaginateParams): Promise<IPagination<PostRO>> {
        let result = await paginate<PostEntity>(this.postRepository, { limit, page, route }, { order: { createdAt: order }, relations: ['author'], cache: isEnableCache });
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
