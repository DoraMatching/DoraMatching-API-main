import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@user/repositories';
import { UserController } from '@user/user.controller';
import { UserResolver } from '@user/user.resolver';
import { UserService } from '@user/user.service';
import { TraineeRepository } from '@trainee/repositories';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository, TraineeRepository])],
    controllers: [UserController],
    providers: [UserService, UserResolver],
})
export class UserModule { }
