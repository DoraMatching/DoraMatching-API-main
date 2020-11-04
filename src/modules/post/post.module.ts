import { PostController } from '@post/post.controller';
import { UserRepository } from '@user/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from '@post/post.service';
import { PostResolver } from '@post/post.resolver';
import { TagPostRepository } from '@tag-post/repositories';
import { PostRepository } from '@post/repositories';
import { Module } from '@nestjs/common';

@Module({
    imports: [
      TypeOrmModule.forFeature([UserRepository, PostRepository, TagPostRepository]),
    ],
    controllers: [PostController],
    providers: [PostService, PostResolver],
})
export class PostModule {
}
