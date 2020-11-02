import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { TopicResolver } from './topic.resolver';

@Module({
  controllers: [TopicController],
  providers: [TopicService, TopicResolver]
})
export class TopicModule {}
