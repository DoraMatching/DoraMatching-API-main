import { IQuestionModel } from '@question/dto/question.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export type IUpdateQuestionDTO = Pick<IQuestionModel, 'content'>;

export class UpdateQuestionDTO implements IUpdateQuestionDTO {
    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(43, { message: 'The text you wrote is longer than "The quick brown fox jumps over the lazy dog"! Please write less...' })
    title: string;

    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(43, { message: 'The text you wrote is shorter than "The quick brown fox jumps over the lazy dog"! Please write more...' })
    content: string;
}
