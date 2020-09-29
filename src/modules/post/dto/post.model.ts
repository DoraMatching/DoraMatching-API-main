import { ApiProperty } from '@nestjs/swagger';
import { IUserModel, UserModel } from '@user/dto/user.model';
import { IsNotEmpty, IsOptional } from 'class-validator';

export interface IPostModel {
    id: string;
    title: string;
    content: string;
    tags: string[];
    author: IUserModel;
    createdAt: Date;
    updatedAt: Date;
}

export class PostModel implements IPostModel {
    @ApiProperty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    content: string;

    @ApiProperty()
    @IsOptional()
    tags: string[];

    @ApiProperty()
    author: UserModel;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}