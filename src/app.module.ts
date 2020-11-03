import { ClasseModule } from '@classe/classe.module';
import { CommentPostModule } from '@comment-post/comment-post.module';
import { CommentQuestionModule } from '@comment-question/comment-question.module';
import { HomeModule } from '@home-modules/home.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from '@post/post.module';
import { QuestionModule } from '@question/question.module';
import { TagPostModule } from '@tag-post/tag-post.module';
import { TagQuestionModule } from '@tag-question/tag-question.module';
import { TopicModule } from '@topic/topic.module';
import { TrainerModule } from '@trainer/trainer.module';
import { UserModule } from '@user/user.module';
import { AccessControlModule } from 'nest-access-control';
import { AutomapperModule } from 'nestjsx-automapper';
import { AppController } from './app.controller';
import { roles } from './app.roles';
import { mailerConfig } from './config';

@Module({
    imports: [
        AutomapperModule.withMapper(),
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
            context: ({ req }) => ({ headers: req.headers }),
        }),
        TypeOrmModule.forRoot(),
        AccessControlModule.forRoles(roles),
        MailerModule.forRoot(mailerConfig),
        UserModule,
        PostModule,
        QuestionModule,
        TagPostModule,
        CommentPostModule,
        CommentQuestionModule,
        TagQuestionModule,
        HomeModule,
        TopicModule,
        ClasseModule,
        TrainerModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
}
