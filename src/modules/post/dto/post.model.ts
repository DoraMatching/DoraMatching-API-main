import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '@user/dto/user.model';
import { IsNotEmpty, IsOptional } from 'class-validator';

export interface IPostModel {
    id: string;
    title: string;
    content: string;
    tags: string[];
    author: Partial<UserModel>;
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
    author: Partial<UserModel>;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}