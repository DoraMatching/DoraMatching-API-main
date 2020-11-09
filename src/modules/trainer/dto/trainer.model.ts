import { ApiProperty } from '@nestjs/swagger';
import { ITopicModel, TopicModel } from '@topic/dto';
import { IUserModel, UserModel } from '@user/dto';
import { ClasseModel, IClasseModel } from '@classe/dto';

export interface ITrainerModel {
    trainerProfile: string;
    user: IUserModel;
    topics: ITopicModel[];
    classes: IClasseModel[];
}

export class TrainerModel implements ITrainerModel {
    @ApiProperty()
    trainerProfile: string;

    @ApiProperty()
    user: UserModel;

    @ApiProperty()
    topics: TopicModel[];

    @ApiProperty()
    classes: ClasseModel[];
}
