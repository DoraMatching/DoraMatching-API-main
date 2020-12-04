import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from '@post/repositories';
import { QuestionRepository } from '@question/repositories';
import { TraineeRepository } from '@trainee/repositories';
import { TrainerRepository } from '@trainer/repositories';
import { UserRepository } from '@user/repositories';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRepository,
            TrainerRepository,
            TraineeRepository,
            PostRepository,
            QuestionRepository,
        ]),
    ],
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule {}
