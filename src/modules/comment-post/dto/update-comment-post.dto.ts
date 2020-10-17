import { ICommentPostModel } from '@comment-post/dto/comment-post.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export type IUpdateCommentPostDTO = Pick<ICommentPostModel, 'content'>;

export class UpdateCommentPostDTO implements IUpdateCommentPostDTO {
    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsNotEmpty()
    @IsString()
    @MinLength(43, { message: 'The text you wrote is shorter than "The quick brown fox jumps over the lazy dog"! Please write more...' })
    content: string;
}
