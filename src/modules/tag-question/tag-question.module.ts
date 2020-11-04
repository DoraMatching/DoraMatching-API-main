import { TagQuestionRepository } from '@tag-question/repositories';
import { UserRepository } from '@user/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from '@question/repositories';
import { TagQuestionService } from '@tag-question/tag-question.service';
import { TagQuestionController } from '@tag-question/tag-question.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([TagQuestionRepository, QuestionRepository, UserRepository])],
    controllers: [TagQuestionController],
    providers: [TagQuestionService],
})
export class TagQuestionModule {
}
