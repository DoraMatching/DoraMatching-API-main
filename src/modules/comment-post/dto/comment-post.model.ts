import { UserModel } from '@user/dto';
import { PostModel } from '@post/dto';

export interface ICommentPost {
    content: string;
    author: Partial<UserModel>;
    post: Partial<PostModel>;
    createdAt?: Date;
    updatedAt?: Date;
}
