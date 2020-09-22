import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './config';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ headers: req.headers })
    }),
    TypeOrmModule.forRoot(),
    AccessControlModule.forRoles(roles),
    MailerModule.forRoot(mailerConfig),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
