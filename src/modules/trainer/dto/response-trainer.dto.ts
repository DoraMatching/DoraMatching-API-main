import { TopicModel } from '@topic/dto';
import { ITrainerModel } from '@trainer/dto';
import { UserModel } from '@user/dto';

export type ITrainerRO = ITrainerModel;

export class TrainerRO implements ITrainerRO {
    trainerProfile: string;
    topics: TopicModel[];
    user: UserModel;
}
