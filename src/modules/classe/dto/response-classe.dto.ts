import { TopicModel } from "@topic/dto";
import { ITrainerModel } from "@trainer/dto";
import { UserModel } from "@user/dto";
import { IClasseModel } from "./classe.model";

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
    topic: Partial<TopicModel>;
    trainers: ITrainerModel[];
    members: UserModel[];
    author: Partial<UserModel>;
    createdAt?: Date;
    updatedAt?: Date;
    type?: string;
}
