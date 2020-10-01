import { ApiProperty } from '@nestjs/swagger';
import { IPostModel } from '@post/dto/post.model';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export type IUpdatePostDTO = Omit<IPostModel, 'id' | 'author' | 'createdAt' | 'updatedAt'>;

export class UpdatePostDTO implements IUpdatePostDTO {
    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsNotEmpty()
    @IsString()
    @MinLength(43, { message: 'The text you wrote is shorter than "The quick brown fox jumps over the lazy dog"! Please write more...' })
    content: string;

    @ApiProperty({ example: ['reactjs', 'nodejs', 'react-native'] })
    @IsOptional()
    tags: string[];
}
