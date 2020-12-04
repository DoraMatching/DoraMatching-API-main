import { HomeController } from '@home-modules/home.controller';
import { HomeService } from '@home-modules/home.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from '@post/repositories';
import { QuestionRepository } from '@question/repositories';
import { UserRepository } from '@user/repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PostRepository,
            QuestionRepository,
            UserRepository,
        ]),
    ],
    providers: [HomeService],
    controllers: [HomeController],
})
export class HomeModule {}
