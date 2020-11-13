import { IUserModel, UserModel } from '@user/dto';
import { IClasseModel } from '@classe/dto';

export interface ITraineeModel {
    traineeProfile: string;
    user: IUserModel;
    classes: IClasseModel[];
}

export class TraineeModel implements ITraineeModel {
    classes: IClasseModel[];
    traineeProfile: string;
    user: UserModel;
}
