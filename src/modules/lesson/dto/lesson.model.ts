import { IClasseModel } from '@classe/dto';

export interface ILessonModel {
    name: string;
    startTime: Date;
    duration: number;
    classe: IClasseModel;
    createdAt?: Date;
    updatedAt?: Date;
}

export class LessonModel implements ILessonModel {
    classe: IClasseModel;
    duration: number;
    name: string;
    startTime: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
