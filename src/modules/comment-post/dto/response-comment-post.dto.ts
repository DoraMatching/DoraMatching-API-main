import { ICommentPostModel } from '@comment-post/dto/comment-post.model';
import { UserModel } from '@user/dto';

export type ICommentPostRO = ICommentPostModel;

export class CommentPostRO implements ICommentPostRO {
    author: Partial<UserModel>;
    content: string;
    createdAt: Date;
    // post: Partial<PostModel>;
    updatedAt: Date;
}
