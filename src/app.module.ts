import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from 'nest-access-control';
import { AppController } from './app.controller';
import { roles } from './app.roles';
import { mailerConfig } from './config';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ headers: req.headers })
    }),
    TypeOrmModule.forRoot(),
    AccessControlModule.forRoles(roles),
    MailerModule.forRoot(mailerConfig),
    UserModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
