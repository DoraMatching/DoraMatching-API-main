import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '@user/dto';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export interface ITopicModel {
    name: string;
    description: string;
    featuredImage: string;
    author: Partial<UserModel>;
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
    author: Partial<UserModel>;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
