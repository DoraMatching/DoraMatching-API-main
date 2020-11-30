import { CommentPostRO } from '@comment-post/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IPostModel } from '@post/dto';
import { TagPostModel } from '@tag-post/dto';
import { UserModel } from '@user/dto';

export interface IPostRO extends IPostModel {
  id: string;
}

export class PostRO implements IPostRO {
  constructor(data) {
    Object.assign(this, data);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  subTitle: string;

  @ApiProperty()
  featuredImage: string;

  @ApiProperty()
  isDraft: boolean;

  @ApiProperty()
  content: string;

  @ApiProperty({ type: () => CommentPostRO, isArray: true })
  comments?: CommentPostRO[];

  @ApiProperty({ type: () => TagPostModel, isArray: true })
  tags: TagPostModel[];

  @ApiProperty({ type: () => UserModel })
  author: Partial<UserModel>;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  type?: string = 'post';
}
