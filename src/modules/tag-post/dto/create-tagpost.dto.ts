import { ApiProperty } from '@nestjs/swagger';
import { ITagPostModel } from '@tag-post/dto';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export type ICreateTagPost = Omit<ITagPostModel, 'posts' | 'createdAt' | 'updatedAt'>;

export class CreateTagPost implements ICreateTagPost {
    @ApiProperty({ example: 'java' })
    @IsNotEmpty()
    @IsString()
    @Matches(/[^,;\n]+/g, { message: 'Invalid tag name' })
    @MinLength(1)
    @MaxLength(43, { message: 'The text you wrote is longer than "The quick brown fox jumps over the lazy dog"! Please write less...' })
    name: string;
}
