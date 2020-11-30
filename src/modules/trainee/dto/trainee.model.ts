import { IClasseModel } from '@classe/dto';
import { IUserModel, UserModel } from '@user/dto';

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
