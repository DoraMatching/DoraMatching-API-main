import { ICommentPostModel } from '@comment-post/dto/';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export type ICreateCommentPostDTO = Pick<ICommentPostModel, 'content'>;

export class CreateCommentPostDTO implements ICreateCommentPostDTO {
    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsNotEmpty()
    @IsString()
    @MinLength(43, { message: 'The text you wrote is shorter than "The quick brown fox jumps over the lazy dog"! Please write more...' })
    content: string;
}
