import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from '@post/post.service';
import { PostRepository } from '@post/repositories/post.repository';
import { TagPostController } from '@tag-post/tag-post.controller';
import { UserRepository } from '@user/repositories/user.repository';
import { TagPostRepository } from './repositories/tag-post.repository';
import { TagPostService } from './tag-post.service';

@Module({
    imports: [TypeOrmModule.forFeature([TagPostRepository, PostRepository, UserRepository])],
    controllers: [TagPostController],
    providers: [TagPostService, PostService],
})
export class TagPostModule { }
