import { TopicModel } from '@topic/dto';
import { TraineeRO } from '@trainee/dto';
import { TrainerModel } from '@trainer/dto';
import { IsNotEmpty } from 'class-validator';
import { IClasseModel } from './classe.model';

export interface IClasseRO extends IClasseModel {
    id: string;
}

export class ClasseRO implements IClasseRO {
    @IsNotEmpty()
    id: string;

    name: string;
    description: string;
    featuredImage: string;
    startTime: Date;
    endTime?: Date;
    duration: number;
    topic: TopicModel;
    trainer: TrainerModel;
    members: TraineeRO[];
    createdAt?: Date;
    updatedAt?: Date;
    type?: string;
}
