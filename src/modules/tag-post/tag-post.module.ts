import { TagPostController } from '@tag-post/tag-post.controller';
import { UserRepository } from '@user/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from '@post/post.service';
import { TagPostRepository } from '@tag-post/repositories';
import { TagPostService } from '@tag-post/tag-post.service';
import { PostRepository } from '@post/repositories';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([TagPostRepository, PostRepository, UserRepository])],
    controllers: [TagPostController],
    providers: [TagPostService, PostService],
})
export class TagPostModule { }
