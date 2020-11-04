import { TrainerRepository } from '@trainer/repositories';
import { TopicController } from '@topic/topic.controller';
import { TopicService } from '@topic/topic.service';
import { UserRepository } from '@user/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicRepository } from '@topic/repositories';
import { TopicResolver } from '@topic/topic.resolver';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, TopicRepository, TrainerRepository]),
    ],
    controllers: [TopicController],
    providers: [TopicService, TopicResolver],
})
export class TopicModule {
}
