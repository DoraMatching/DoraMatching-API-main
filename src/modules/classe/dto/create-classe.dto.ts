import { IClasseModel } from '@classe/dto/classe.model';
import { ITopicModel, TopicRO } from '@topic/dto';
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTagPostDTO } from '@tag-post/dto';

export type ICreateClasseDTO = Pick<IClasseModel, 'name' | 'description' | 'featuredImage' | 'startTime' | 'endTime' | 'topic' | 'duration'>;

export class CreateClasseDTO implements ICreateClasseDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsUrl()
    featuredImage: string;

    @IsNotEmpty()
    @IsInt()
    duration: number;

    @IsNotEmpty()
    @IsDateString()
    startTime: Date;

    @IsOptional()
    @IsDateString()
    endTime: Date;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => TopicRO)
    topic: TopicRO;
}
