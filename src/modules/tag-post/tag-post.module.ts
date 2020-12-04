import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from '@post/post.service';
import { PostRepository } from '@post/repositories';
import { TagPostRepository } from '@tag-post/repositories';
import { TagPostController } from '@tag-post/tag-post.controller';
import { TagPostService } from '@tag-post/tag-post.service';
import { UserRepository } from '@user/repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TagPostRepository,
            PostRepository,
            UserRepository,
        ]),
    ],
    controllers: [TagPostController],
    providers: [TagPostService, PostService],
})
export class TagPostModule {}
