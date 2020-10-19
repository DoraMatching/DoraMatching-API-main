import { Module } from '@nestjs/common';
import { TagQuestionController } from './tag-question.controller';
import { TagQuestionService } from './tag-question.service';

@Module({
  controllers: [TagQuestionController],
  providers: [TagQuestionService]
})
export class TagQuestionModule {}
