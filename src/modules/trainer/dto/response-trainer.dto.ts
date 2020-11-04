import { UserModel } from '@user/dto';
import { ITrainerModel } from '@trainer/dto';
import { TopicModel } from '@topic/dto';

export type ITrainerRO = ITrainerModel;

export class TrainerRO implements ITrainerRO {
    trainerProfile: string;
    topics: TopicModel[];
    user: UserModel;
}
