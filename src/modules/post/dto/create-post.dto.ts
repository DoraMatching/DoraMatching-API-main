import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { IPostModel } from './post.model';

export type ICreatePostDTO = Omit<IPostModel, 'author' | 'createdAt' | 'updatedAt'>;

export class CreatePostDTO implements ICreatePostDTO {
    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsNotEmpty()
    subTitle: string;

    @ApiProperty({ example: 'https://doramatching.tk/abc.jpg' })
    @IsNotEmpty()
    featuredImage: string;

    @ApiProperty({ example: true })
    @IsNotEmpty()
    isDraft: boolean;

    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsNotEmpty()
    @IsString()
    @MinLength(43, { message: 'The text you wrote is shorter than "The quick brown fox jumps over the lazy dog"! Please write more...' })
    content: string;

    @ApiProperty({ example: ['reactjs', 'nodejs', 'react-native'] })
    @IsOptional()
    tags: string[];
}
