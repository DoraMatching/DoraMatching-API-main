import { UserModel } from '@/modules/user/dto';
import { CommentPostRO } from '@comment-post/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IPostModel } from '@post/dto';
import { TagPostModel } from '@tag-post/dto';

export interface IPostRO extends IPostModel {
    id: string;
}

export class PostRO implements IPostRO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    subTitle: string;

    @ApiProperty()
    featuredImage: string;

    @ApiProperty()
    isDraft: boolean;

    @ApiProperty()
    content: string;

    @ApiProperty()
    comments ?: CommentPostRO[];

    @ApiProperty()
    tags: TagPostModel[];

    @ApiProperty({ type: () => UserModel })
    author: Partial<UserModel>;

    @ApiProperty()
    createdAt?: Date;

    @ApiProperty()
    updatedAt?: Date;
}
