import { CommentPostRepository } from '@comment-post/repositories/comment-post.repository,ts';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from '@post/repositories/post.repository';
import { UserRepository } from '@user/repositories/user.repository';
import { CommentPostController } from './comment-post.controller';
import { CommentPostService } from './comment-post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, PostRepository, CommentPostRepository])
  ],
  controllers: [CommentPostController],
  providers: [CommentPostService]
})
export class CommentPostModule {}
