import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from '@question/repositories';
import { TagQuestionRepository } from '@tag-question/repositories';
import { TagQuestionController } from '@tag-question/tag-question.controller';
import { TagQuestionService } from '@tag-question/tag-question.service';
import { UserRepository } from '@user/repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TagQuestionRepository,
            QuestionRepository,
            UserRepository,
        ]),
    ],
    controllers: [TagQuestionController],
    providers: [TagQuestionService],
})
export class TagQuestionModule {}
