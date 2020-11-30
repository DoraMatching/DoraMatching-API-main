import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from '@question/question.controller';
import { QuestionService } from '@question/question.service';
import { QuestionRepository } from '@question/repositories';
import { TagQuestionRepository } from '@tag-question/repositories';
import { UserRepository } from '@user/repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      QuestionRepository,
      TagQuestionRepository,
    ]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
