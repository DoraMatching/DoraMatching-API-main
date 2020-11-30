import { ICommentPostModel } from '@comment-post/dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '@user/dto';

export type ICommentPostRO = ICommentPostModel;

export class CommentPostRO implements ICommentPostRO {
  @ApiProperty()
  content: string;

  @ApiProperty({ type: () => UserModel })
  author: Partial<UserModel>;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: () => String, default: 'comment-post' })
  type?: string = 'comment-post';
}
