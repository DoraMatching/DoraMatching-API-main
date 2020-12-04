import { ApiProperty } from '@nestjs/swagger';
import { QuestionModel } from '@question/dto';
import { UserModel } from '@user/dto';

export interface ICommentQuestionModel {
    content: string;
    author: Partial<UserModel>;
    question?: Partial<QuestionModel>;
    createdAt?: Date;
    updatedAt?: Date;
}

export class CommentQuestionModel implements ICommentQuestionModel {
    @ApiProperty()
    content: string;

    @ApiProperty({ type: () => UserModel })
    author: Partial<UserModel>;

    @ApiProperty({ type: () => QuestionModel })
    question?: Partial<QuestionModel>;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
