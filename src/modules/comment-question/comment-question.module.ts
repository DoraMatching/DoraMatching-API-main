import { CommentQuestionRepository } from '@comment-question/repositories/comment-question.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from '@question/repositories/question.repository';
import { UserRepository } from '@user/repositories/user.repository';
import { CommentQuestionController } from './comment-question.controller';
import { CommentQuestionService } from './comment-question.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository, QuestionRepository, CommentQuestionRepository])],
    controllers: [CommentQuestionController],
    providers: [CommentQuestionService],
})
export class CommentQuestionModule {
}
