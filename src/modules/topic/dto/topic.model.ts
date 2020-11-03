import { ClasseModel, IClasseModel } from '@classe/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IUserModel, UserModel } from '@user/dto';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export interface ITopicModel {
    name: string;
    description: string;
    featuredImage: string;
    author: Partial<IUserModel>;
    classes: Partial<IClasseModel>[];
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
    classes: ClasseModel[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
