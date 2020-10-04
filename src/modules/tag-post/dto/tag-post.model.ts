import { IPostModel, PostModel } from '@post/dto';

export interface ITagPostModel {
    name: string;
    posts: IPostModel[];
    createdAt: Date;
    updatedAt: Date;
}

export class TagPostModel implements ITagPostModel {
    name: string;
    posts: PostModel[];
    createdAt: Date;
    updatedAt: Date;
}
