import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    MinLength,
    ValidateNested,
} from 'class-validator';
import { IPostModel } from './post.model';
import { Type } from 'class-transformer';
import { CreateTagPostDTO } from '@tag-post/dto';

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

    @ApiProperty({ type: () => CreateTagPostDTO, isArray: true })
    @ValidateNested()
    @Type(() => CreateTagPostDTO)
    @IsOptional()
    @IsArray()
    tags: CreateTagPostDTO[];
}
