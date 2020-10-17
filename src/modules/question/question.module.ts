import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from '@question/repositories/question.repository';
import { UserRepository } from '@user/repositories/user.repository';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, QuestionRepository])
  ],
  controllers: [QuestionController],
  providers: [QuestionService]
})
export class QuestionModule {}
