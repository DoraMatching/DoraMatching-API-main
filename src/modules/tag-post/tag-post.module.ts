import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from '@post/repositories/post.repository';
import { UserRepository } from '@user/repositories/user.repository';
import { TagPostRepository } from './repositories/tag-post.repository';
import { TagPostService } from './tag-post.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagPostRepository, PostRepository, UserRepository])],
  providers: [TagPostService],
})
export class TagPostModule { }
