import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagPostRepository } from '@tag-post/repositories/tag-post.repository';
import { UserRepository } from '@user/repositories/user.repository';
import { PostController } from './post.controller';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { PostRepository } from './repositories/post.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository, PostRepository, TagPostRepository])],
    controllers: [PostController],
    providers: [PostService, PostResolver],
})
export class PostModule {
}
