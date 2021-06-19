import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@user/repositories';
import { RecommenderController } from './recommender.controller';
import { RecommenderService } from './recommender.service';

@Module({
    imports:[TypeOrmModule.forFeature([
        UserRepository,
    ]),],
    controllers: [RecommenderController],
    providers: [RecommenderService],
    exports: [RecommenderService],
})
export class RecommenderModule {}
