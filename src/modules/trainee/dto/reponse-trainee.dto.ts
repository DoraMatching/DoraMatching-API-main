import { IClasseModel } from '@classe/dto';
import { IUserModel } from '@user/dto';
import { ITraineeModel } from './trainee.model';

export type ITraineeRO = ITraineeModel;

export class TraineeRO implements ITraineeRO {
    traineeProfile: string;
    user: IUserModel;
    classes: IClasseModel[];
}
