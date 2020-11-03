import { ApiProperty } from '@nestjs/swagger';
import { ITopicModel } from '@topic/dto/topic.model';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export type IUpdateTopicDTO = Pick<ITopicModel, 'name' | 'description' | 'featuredImage'>;

export class UpdateTopicDTO implements IUpdateTopicDTO {
    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsOptional()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 'https://doramatching.tk/abc.jpg' })
    @IsOptional()
    @IsString()
    @IsUrl()
    featuredImage: string;
}
