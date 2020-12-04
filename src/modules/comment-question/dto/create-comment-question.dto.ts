import { ICommentQuestionModel } from '@comment-question/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export type ICreateCommentQuestionDTO = Pick<ICommentQuestionModel, 'content'>;

export class CreateCommentQuestionDTO implements ICreateCommentQuestionDTO {
    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsNotEmpty()
    @IsString()
    content: string;
}
