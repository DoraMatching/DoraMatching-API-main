import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from '@post/repositories/post.repository';
import { TagPostService } from './tag-post.service';
import { UserRepository } from '@user/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository, UserRepository])],
  providers: [TagPostService],
})
export class TagPostModule { }
