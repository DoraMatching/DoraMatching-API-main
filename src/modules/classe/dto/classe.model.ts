import { ApiProperty } from '@nestjs/swagger';
import { TopicModel } from '@topic/dto';
import { ITrainerModel, TrainerModel } from '@trainer/dto';
import { UserModel } from '@user/dto';

export interface IClasseModel {
    name: string;
    description: string;
    featuredImage: string;
    startTime: Date;
    endTime?: Date;
    duration: number;
    topic: Partial<TopicModel>;
    trainers: ITrainerModel[];
    members: UserModel[];
    author: Partial<UserModel>;
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
    topic: Partial<TopicModel>;

    @ApiProperty()
    trainers: TrainerModel[];

    @ApiProperty()
    members: UserModel[];

    @ApiProperty()
    author: Partial<UserModel>;

    @ApiProperty()
    createdAt?: Date;

    @ApiProperty()
    updatedAt?: Date;

    @ApiProperty()
    type?: string;
}
