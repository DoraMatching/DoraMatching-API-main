import { ClasseRO, IClasseModel } from '@classe/dto';
import { IUserModel, UserModel, UserRO } from '@user/dto';
import { ITraineeModel } from './trainee.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export interface ITraineeRO extends ITraineeModel {
    id: string;
}

export class TraineeRO implements ITraineeRO {
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    traineeProfile: string;

    @ApiProperty({ type: () => UserModel })
    user: UserModel;

    @ApiProperty({ type: () => ClasseRO, isArray: true })
    classes: ClasseRO[];
}
