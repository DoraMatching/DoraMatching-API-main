import { ClasseRO } from '@classe/dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '@user/dto';
import { IsNotEmpty } from 'class-validator';
import { ITraineeModel } from './trainee.model';

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
