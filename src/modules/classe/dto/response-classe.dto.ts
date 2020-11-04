import { TopicModel } from '@topic/dto';
import { TrainerModel } from '@trainer/dto';
import { UserModel } from '@user/dto';
import { IClasseModel } from './classe.model';

export interface IClasseRO extends IClasseModel {
    id: string;
}

export class ClasseRO implements IClasseRO {
    id: string;
    name: string;
    description: string;
    featuredImage: string;
    startTime: Date;
    endTime?: Date;
    duration: number;
    topic: TopicModel;
    trainer: TrainerModel;
    members: UserModel[];
    author: Partial<UserModel>;
    createdAt?: Date;
    updatedAt?: Date;
    type?: string;
}