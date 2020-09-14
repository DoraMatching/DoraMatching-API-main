import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  controllers: [UserController],
  providers: [UserService, UserResolver]
})
export class UserModule {}
