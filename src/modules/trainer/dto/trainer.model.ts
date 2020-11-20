import { ClasseModel, IClasseModel } from '@classe/dto';
import { ApiProperty } from '@nestjs/swagger';
import { ITopicModel, TopicModel } from '@topic/dto';
import { IUserModel, UserModel } from '@user/dto';

export interface ITrainerModel {
    trainerProfile: string;
    user: Partial<IUserModel>;
    topics: ITopicModel[];
    classes: IClasseModel[];
    createdAt?: Date;
    updatedAt?: Date;
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

    @ApiProperty()
    createdAt?: Date;

    @ApiProperty()
    updatedAt?: Date;
}
