import { IUserModel } from '@/modules/user/dto';
import { IPostModel } from '@/modules/post/dto';

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