import { UserRepository } from '@user/repositories';
import { CommentPostController } from '@comment-post/comment-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentPostRepository } from '@comment-post/repositories';
import { CommentPostService } from '@comment-post/comment-post.service';
import { PostRepository } from '@post/repositories';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CommentPostRepository,
            PostRepository,
            UserRepository,
        ]),
    ],
    controllers: [CommentPostController],
    providers: [CommentPostService],
})
export class CommentPostModule {
}
