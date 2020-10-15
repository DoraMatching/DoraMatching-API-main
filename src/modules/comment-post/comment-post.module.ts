import { Module } from '@nestjs/common';
import { CommentPostController } from './comment-post.controller';
import { CommentPostService } from './comment-post.service';
import { CommentPostRepository } from '@comment-post/repositories/comment-post.repository,ts';
import { PostRepository } from '@post/repositories/post.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@user/repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, PostRepository, CommentPostRepository])
  ],
  controllers: [CommentPostController],
  providers: [CommentPostService]
})
export class CommentPostModule {}
