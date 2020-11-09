import { IClasseModel } from '@classe/dto/classe.model';
import { TopicRO } from '@topic/dto';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';

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
