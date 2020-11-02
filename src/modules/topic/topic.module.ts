import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@user/repositories/user.repository';
import { TopicRepository } from './repositories/topic.repository';
import { TopicController } from './topic.controller';
import { TopicResolver } from './topic.resolver';
import { TopicService } from './topic.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, TopicRepository])
  ],
  controllers: [TopicController],
  providers: [TopicService, TopicResolver]
})
export class TopicModule { }
