import { ApiProperty } from '@nestjs/swagger';
import { ITopicModel } from '@topic/dto';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export type ICreateTopicDTO = Pick<
    ITopicModel,
    'name' | 'description' | 'featuredImage'
>;

export class CreateTopicDTO implements ICreateTopicDTO {
    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'The quick brown fox jumps over the lazy dog' })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ example: 'https://doramatching.tk/abc.jpg' })
    @IsOptional()
    @IsString()
    @IsUrl()
    featuredImage: string;
}
