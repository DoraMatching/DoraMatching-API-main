import { IPostModel } from '@post/dto';

export interface ITagPostModel {
    name: string;
    posts: IPostModel[];
    createdAt: Date;
    updatedAt: Date;
}
