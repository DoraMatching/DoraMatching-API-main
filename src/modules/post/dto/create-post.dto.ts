import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
import { IPostModel } from './post.model';
import { TagPostModel } from '@tag-post/dto/tag-post.model';
import { Transform } from 'class-transformer';

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
    @IsOptional()
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

    @ApiProperty({ example: ['react', 'nodejs', 'react-native'] })
    @IsOptional()
    @IsArray()
    // @Transform((tags) => {
    //     return tags.map((tag) => {
    //         console.log('123', tag);
    //         name: tag.name.toLowerCase();
    //     });
    // })
    tags: TagPostModel[];
}
