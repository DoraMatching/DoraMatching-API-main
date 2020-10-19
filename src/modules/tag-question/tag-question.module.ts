import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from '../question/repositories/question.repository';
import { UserRepository } from '../user/repositories/user.repository';
import { TagQuestionRepository } from './repositories/tag-question.repository';
import { TagQuestionController } from './tag-question.controller';
import { TagQuestionService } from './tag-question.service';

@Module({
    imports: [TypeOrmModule.forFeature([TagQuestionRepository, QuestionRepository, UserRepository])],
    controllers: [TagQuestionController],
    providers: [TagQuestionService],
})
export class TagQuestionModule {
}
