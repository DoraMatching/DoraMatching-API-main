import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
import { IPostModel } from './post.model';
import { TagPostModel } from '@tag-post/dto/tag-post.model';

export type ICreatePostDTO = Omit<IPostModel, 'author' | 'createdAt' | 'updatedAt'>;

export class CreatePostDTO implements ICreatePostDTO {
    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsOptional()
    @IsString()
    subTitle: string;

    @ApiProperty({ example: 'https://doramatching.tk/abc.jpg' })
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    featuredImage: string;

    @ApiProperty({ example: true })
    @IsNotEmpty()
    @IsBoolean()
    isDraft: boolean;

    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsNotEmpty()
    @IsString()
    @MinLength(43, { message: 'The text you wrote is shorter than "The quick brown fox jumps over the lazy dog"! Please write more...' })
    content: string;

    @ApiProperty({ example: ['reactjs', 'nodejs', 'react-native'] })
    @IsOptional()
    tags: TagPostModel[];
}
