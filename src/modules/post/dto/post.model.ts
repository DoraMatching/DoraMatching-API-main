import { CommentPostModel, ICommentPostModel } from '@comment-post/dto';
import { ApiProperty } from '@nestjs/swagger';
import { ITagPostModel, TagPostModel } from '@tag-post/dto';
import { UserModel } from '@user/dto';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export interface IPostModel {
    title: string;
    subTitle: string;
    featuredImage: string;
    isDraft: boolean;
    content: string;
    tags: ITagPostModel[];
    comments?: ICommentPostModel[];
    author: Partial<UserModel>;
    createdAt?: Date;
    updatedAt?: Date;
}

export class PostModel implements IPostModel {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    subTitle: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    featuredImage: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    isDraft: boolean;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    tags: TagPostModel[];

    @ApiProperty()
    @IsArray()
    @IsOptional()
    comments?: CommentPostModel[];

    @ApiProperty()
    author: Partial<UserModel>;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
