import { ICommentQuestionModel } from '@comment-question/dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '@user/dto';

export type ICommentQuestionRO = ICommentQuestionModel;

export class CommentQuestionRO implements ICommentQuestionRO {
    @ApiProperty()
    content: string;

    @ApiProperty({ type: () => UserModel })
    author: Partial<UserModel>;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ type: () => String, default: 'comment-question' })
    type?: string = 'comment-question';
}
