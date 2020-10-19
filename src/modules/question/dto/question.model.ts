import { IUserModel, UserModel } from '@user/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CommentQuestionModel, ICommentQuestionModel } from '@comment-question/dto';
import { ITagQuestionModel, TagQuestionModel } from '@/modules/tag-question/dto';

export interface IQuestionModel {
    title: string;
    content: string;
    author: Partial<IUserModel>;
    comments: ICommentQuestionModel[];
    tags: ITagQuestionModel[]
    createdAt?: string;
    updatedAt?: string;
}

export class QuestionModel implements IQuestionModel {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty({ type: () => UserModel })
    author: Partial<IUserModel>;

    @ApiProperty()
    @IsString()
    content: string;

    @ApiProperty({ type: () => CommentQuestionModel, isArray: true })
    @IsArray()
    comments: CommentQuestionModel[];

    @ApiProperty({type: () => TagQuestionModel, isArray: true})
    tags: TagQuestionModel[];

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    updatedAt: string;
}
