import { ICommentPostModel } from '@comment-post/dto/comment-post.model';
import { UserModel } from '@user/dto';
import { PostModel } from '@post/dto';

export class CommentPostRO implements ICommentPostModel {
    author: Partial<UserModel>;
    content: string;
    createdAt: Date;
    post: Partial<PostModel>;
    updatedAt: Date;
}
