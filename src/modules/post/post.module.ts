import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PostResolver]
})
export class PostModule { }
