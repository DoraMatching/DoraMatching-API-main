import { CommentQuestionController } from '@comment-question/comment-question.controller';
import { CommentQuestionService } from '@comment-question/comment-question.service';
import { CommentQuestionRepository } from '@comment-question/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from '@question/repositories';
import { UserRepository } from '@user/repositories';

@Module({
    imports: [TypeOrmModule.forFeature([
        CommentQuestionRepository,
        QuestionRepository,
        UserRepository,
    ])],
    controllers: [CommentQuestionController],
    providers: [CommentQuestionService],
})
export class CommentQuestionModule {
}
