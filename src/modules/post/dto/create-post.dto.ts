import { IPostModel } from "./post.model";

export type ICreatePostDTO = Omit<IPostModel, 'id' | 'author' | 'createdAt' | 'updatedAt'>;

export class CreatePostDTO implements ICreatePostDTO {
    title: string;
    content: string;
    tags: string[];
}