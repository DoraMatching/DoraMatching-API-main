import { IClasseModel } from '@classe/dto';

export interface ILessonModel {
    name: string;
    timeStart: Date;
    duration: number;
    classe: IClasseModel;
    createdAt?: Date;
    updatedAt?: Date;
}

export class LessonModel implements ILessonModel{
    classe: IClasseModel;
    duration: number;
    name: string;
    timeStart: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
