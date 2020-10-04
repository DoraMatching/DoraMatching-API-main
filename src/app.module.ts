import { AccessControlModule } from 'nest-access-control';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { PostModule } from '@post/post.module';
import { QuestionModule } from '@question/question.module';
import { TagPostModule } from '@tag-post/tag-post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@user/user.module';
import { mailerConfig } from './config';
import { roles } from './app.roles';

@Module({
    imports: [
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
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
}
