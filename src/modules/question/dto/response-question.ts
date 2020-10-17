import { IQuestionModel } from '@question/dto/question.model';
import { UserModel } from '@user/dto';

export type IQuestionRO = IQuestionModel;

export class QuestionRO implements IQuestionRO {
    author: Partial<UserModel>;
    content: string;
    createdAt: string;
    updatedAt: string;
}
