import { UserRepository } from '@user/repositories';
import { TagQuestionRepository } from '@tag-question/repositories';
import { QuestionController } from '@question/question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from '@question/repositories';
import { QuestionService } from '@question/question.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, QuestionRepository, TagQuestionRepository]),
    ],
    controllers: [QuestionController],
    providers: [QuestionService],
})
export class QuestionModule {
}
