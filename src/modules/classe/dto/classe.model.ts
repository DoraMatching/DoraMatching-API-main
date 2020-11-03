import { UserModel } from '@user/dto';
import { TopicModel } from '@topic/dto';

export interface ClasseModel {
    name: string;
    description: string;
    featuredImage: string;
    duration: string;
    topic: Partial<TopicModel>;
    trainers: UserModel[];
    members: UserModel[];
    author: Partial<UserModel>;
    createdAt?: Date;
    updatedAt?: Date;
    type?: string;
}
