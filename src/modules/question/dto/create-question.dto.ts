import { CreateTagQuestionDTO } from '@/modules/tag-question/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IQuestionModel } from '@question/dto/question.model';
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export type ICreateQuestionDTO = Pick<IQuestionModel, 'content'>;

export class CreateQuestionDTO implements ICreateQuestionDTO {
    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(43, { message: 'The text you wrote is longer than "The quick brown fox jumps over the lazy dog"! Please write less...' })
    title: string;

    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsNotEmpty()
    @IsString()
    @MinLength(43, { message: 'The text you wrote is shorter than "The quick brown fox jumps over the lazy dog"! Please write more...' })
    content: string;

    @ApiProperty({ type: () => CreateTagQuestionDTO, isArray: true })
    @IsOptional()
    @IsArray()
    tags: CreateTagQuestionDTO[] = [];
}
