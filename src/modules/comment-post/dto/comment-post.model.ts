import { ApiProperty } from '@nestjs/swagger';
import { PostModel } from '@post/dto';
import { UserModel } from '@user/dto';

export interface ICommentPostModel {
    content: string;
    author: Partial<UserModel>;
    post?: Partial<PostModel>;
    createdAt?: Date;
    updatedAt?: Date;
}

export class CommentPostModel implements ICommentPostModel {
    @ApiProperty()
    content: string;

    @ApiProperty({ type: () => UserModel })
    author: Partial<UserModel>;

    @ApiProperty({ type: () => PostModel })
    post?: Partial<PostModel>;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
