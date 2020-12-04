import { ApiProperty } from '@nestjs/swagger';
import { ITrainerModel, TrainerModel } from '@trainer/dto';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export interface ITopicModel {
    name: string;
    description: string;
    featuredImage: string;
    author: ITrainerModel;
    createdAt?: Date;
    updatedAt?: Date;
    type?: string;
}

export class TopicModel implements ITopicModel {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsString()
    @IsUrl()
    featuredImage: string;

    @ApiProperty()
    author: TrainerModel;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
