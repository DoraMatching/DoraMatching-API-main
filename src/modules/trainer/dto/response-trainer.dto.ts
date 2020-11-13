import { ClasseModel, ClasseRO } from '@classe/dto';
import { ApiProperty } from '@nestjs/swagger';
import { TopicModel, TopicRO } from '@topic/dto';
import { ITrainerModel } from '@trainer/dto';
import { UserModel, UserRO } from '@user/dto';

export type ITrainerRO = ITrainerModel;

export class TrainerRO implements ITrainerRO {
    @ApiProperty()
    trainerProfile: string;

    @ApiProperty({ type: () => TopicRO, isArray: true })
    topics: TopicModel[];

    @ApiProperty({ type: () => UserRO })
    user: UserModel;

    @ApiProperty({ type: () => ClasseRO, isArray: true })
    classes: ClasseModel[];
}
