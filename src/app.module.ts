import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from '@post/post.module';
import { UserModule } from '@user/user.module';
import { AccessControlModule } from 'nest-access-control';
import { AppController } from './app.controller';
import { roles } from './app.roles';
import { mailerConfig } from './config';
import { QuestionModule } from './modules/question/question.module';

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
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
}
