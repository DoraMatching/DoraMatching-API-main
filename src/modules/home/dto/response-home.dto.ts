import { IPostRO } from '@post/dto';
import { IQuestionRO } from '@question/dto';
import { IUserRO } from '@user/dto';

export type IHomeRO = IUserRO | IPostRO | IQuestionRO;
