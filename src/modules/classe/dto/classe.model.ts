import { ApiProperty } from '@nestjs/swagger';
import { ITopicModel, TopicModel } from '@topic/dto';
import { ITraineeModel, TraineeModel } from '@trainee/dto/trainee.model';
import { ITrainerModel, TrainerModel } from '@trainer/dto';

export interface IClasseModel {
  name: string;
  description: string;
  featuredImage: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  topic: ITopicModel;
  trainer: ITrainerModel;
  members: ITraineeModel[];
  createdAt?: Date;
  updatedAt?: Date;
  type?: string;
}

export class ClasseModel implements IClasseModel {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  featuredImage: string;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime?: Date;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  topic: TopicModel;

  @ApiProperty()
  trainer: TrainerModel;

  @ApiProperty()
  members: TraineeModel[];

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  type?: string;
}
