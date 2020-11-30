import { ICommentPostModel } from '@comment-post/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export type ICreateCommentPostDTO = Pick<ICommentPostModel, 'content'>;

export class CreateCommentPostDTO implements ICreateCommentPostDTO {
  @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
