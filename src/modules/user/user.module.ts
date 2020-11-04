import { UserRepository } from '@user/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@user/user.service';
import { UserController } from '@user/user.controller';
import { UserResolver } from '@user/user.resolver';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    controllers: [UserController],
    providers: [UserService, UserResolver],
})
export class UserModule { }
