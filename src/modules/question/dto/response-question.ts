import { IQuestionModel } from '@question/dto/question.model';
import { UserModel } from '@user/dto';
import { ApiProperty } from '@nestjs/swagger';
import { CommentQuestionRO } from '@/modules/comment-question/dto';
import { TagQuestionRO } from '@/modules/tag-question/dto';

export type IQuestionRO = IQuestionModel;

export class QuestionRO implements IQuestionRO {
    @ApiProperty()
    title: string;

    @ApiProperty({ type: () => UserModel })
    author: Partial<UserModel>;

    @ApiProperty({ type: () => CommentQuestionRO, isArray: true })
    comments: CommentQuestionRO[];

    @ApiProperty({ type: () => TagQuestionRO, isArray: true })
    tags: TagQuestionRO[];

    @ApiProperty()
    content: string;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    updatedAt: string;
}
