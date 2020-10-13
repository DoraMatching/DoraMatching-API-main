import { Module } from '@nestjs/common';
import { CommentPostController } from './comment-post.controller';
import { CommentPostService } from './comment-post.service';

@Module({
  controllers: [CommentPostController],
  providers: [CommentPostService]
})
export class CommentPostModule {}
