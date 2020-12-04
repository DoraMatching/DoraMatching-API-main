import { TrainerModel } from '@trainer/dto';
import { ApiProperty } from '@nestjs/swagger';
import { ITopicModel } from '@topic/dto';
import { UserModel } from '@user/dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export interface ITopicRO extends ITopicModel {
    id: string;
}

export class TopicRO implements ITopicRO {
    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsOptional()
    featuredImage: string;

    @ApiProperty({ type: () => UserModel })
    author: TrainerModel;

    @ApiProperty()
    @IsOptional()
    createdAt: Date;

    @ApiProperty()
    @IsOptional()
    updatedAt: Date;

    @ApiProperty({ type: () => String, default: 'topic' })
    @IsOptional()
    type?: string;
}
