import { IPostModel } from '@post/dto';
import { IUserModel } from '@user/dto';

export type IPostRO = IPostModel;

export class PostRO implements IPostRO {
    id: string;
    title: string;
    content: string;
    tags: string[];
    author: IUserModel;
    createdAt: Date;
    updatedAt: Date;
}