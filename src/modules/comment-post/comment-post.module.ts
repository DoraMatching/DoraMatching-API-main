import { CommentPostController } from '@comment-post/comment-post.controller';
import { CommentPostService } from '@comment-post/comment-post.service';
import { CommentPostRepository } from '@comment-post/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from '@post/repositories';
import { UserRepository } from '@user/repositories';

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
