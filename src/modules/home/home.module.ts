import { UserRepository } from '@user/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeController } from '@home-modules/home.controller';
import { HomeService } from '@home-modules/home.service';
import { QuestionRepository } from '@question/repositories';
import { PostRepository } from '@post/repositories';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([
        PostRepository,
        QuestionRepository,
        UserRepository,
    ])],
    providers: [HomeService],
    controllers: [HomeController],
})
export class HomeModule {

}
