import { IClasseModel } from '@classe/dto/classe.model';

export type ICreateClasseDTO = Pick<IClasseModel, 'name' | 'description' | 'featuredImage' | 'startTime' | 'endTime' | 'topic' | 'duration'>;
