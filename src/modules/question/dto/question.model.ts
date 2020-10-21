import { ITagQuestionModel, TagQuestionModel } from '@/modules/tag-question/dto';
import { CommentQuestionModel, ICommentQuestionModel } from '@comment-question/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IUserModel, UserModel } from '@user/dto';
import { IsArray, IsString } from 'class-validator';

export interface IQuestionModel {
    title: string;
    content: string;
    author: Partial<IUserModel>;
    comments: ICommentQuestionModel[];
    tags: ITagQuestionModel[]
    createdAt?: Date;
    updatedAt?: Date;
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
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
