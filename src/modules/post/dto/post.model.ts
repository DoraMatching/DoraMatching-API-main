import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '@user/dto/user.model';
import { IsNotEmpty, IsOptional } from 'class-validator';

export interface IPostModel {
    title: string;
    subTitle: string;
    featuredImage: string;
    isDraft: boolean;
    content: string;
    tags: string[];
    author: Partial<UserModel>;
    createdAt: Date;
    updatedAt: Date;
}

export class PostModel implements IPostModel {
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    subTitle: string;

    @ApiProperty()
    @IsNotEmpty()
    featuredImage: string;

    @ApiProperty()
    @IsNotEmpty()
    isDraft: boolean;

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
