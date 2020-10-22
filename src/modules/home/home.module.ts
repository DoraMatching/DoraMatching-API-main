import { HomeController } from '@home-modules/home.controller';
import { HomeService } from '@home-modules/home.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from '@post/repositories/post.repository';
import { QuestionRepository } from '@question/repositories/question.repository';
import { UserRepository } from '@user/repositories/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository, PostRepository, QuestionRepository])],
    providers: [HomeService],
    controllers: [HomeController]
})
export class HomeModule {

}
