import { TopicModel } from '@topic/dto';
import { ITrainerModel } from '@trainer/dto';
import { UserModel } from '@user/dto';
import { ClasseModel } from '@classe/dto';

export type ITrainerRO = ITrainerModel;

export class TrainerRO implements ITrainerRO {
    trainerProfile: string;
    topics: TopicModel[];
    user: UserModel;
    classes: ClasseModel[];
}
