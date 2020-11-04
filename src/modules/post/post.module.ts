import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from '@post/post.controller';
import { PostResolver } from '@post/post.resolver';
import { PostService } from '@post/post.service';
import { PostRepository } from '@post/repositories';
import { TagPostRepository } from '@tag-post/repositories';
import { UserRepository } from '@user/repositories';

@Module({
    imports: [
      TypeOrmModule.forFeature([UserRepository, PostRepository, TagPostRepository]),
    ],
    controllers: [PostController],
    providers: [PostService, PostResolver],
})
export class PostModule {
}
