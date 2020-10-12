
export interface ITagPostModel {
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class TagPostModel implements ITagPostModel {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
