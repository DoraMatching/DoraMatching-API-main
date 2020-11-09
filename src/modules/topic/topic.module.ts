import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicRepository } from '@topic/repositories';
import { TopicController } from '@topic/topic.controller';
import { TopicResolver } from '@topic/topic.resolver';
import { TopicService } from '@topic/topic.service';
import { TrainerRepository } from '@trainer/repositories';
import { UserRepository } from '@user/repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, TopicRepository, TrainerRepository]),
    ],
    controllers: [TopicController],
    providers: [TopicService, TopicResolver],
})
export class TopicModule {
}
