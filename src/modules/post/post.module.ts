import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@user/entity/user.entity';
import { PostEntity } from './entity/post.entity';
import { PostController } from './post.controller';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { PostRepository } from './repositories/post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity, PostRepository])],
  controllers: [PostController],
  providers: [PostService, PostResolver]
})
export class PostModule { }
