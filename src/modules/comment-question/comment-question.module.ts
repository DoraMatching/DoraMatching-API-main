import { Module } from '@nestjs/common';
import { CommentQuestionController } from './comment-question.controller';
import { CommentQuestionService } from './comment-question.service';

@Module({
  controllers: [CommentQuestionController],
  providers: [CommentQuestionService]
})
export class CommentQuestionModule {}
