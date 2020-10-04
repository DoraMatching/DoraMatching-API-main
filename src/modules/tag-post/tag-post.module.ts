import { Module } from '@nestjs/common';
import { TagPostService } from './tag-post.service';

@Module({
  providers: [TagPostService]
})
export class TagPostModule {}
