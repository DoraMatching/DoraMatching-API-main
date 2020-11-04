import { ApiProperty } from "@nestjs/swagger";
import { TopicModel } from "@topic/dto";
import { UserModel } from "@user/dto";

export interface ITrainerModel {
    trainerProfile: string;
    user: UserModel;
    topics: TopicModel[];
}

export class TrainerModel implements ITrainerModel{
    @ApiProperty()
    trainerProfile: string;

    @ApiProperty()
    user: UserModel;

    @ApiProperty()
    topics: TopicModel[];
}
