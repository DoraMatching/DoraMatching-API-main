import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "@user/dto";
import { TopicModel } from "@/modules/topic/dto";

export interface ITrainerModel {
    user: UserModel;
    topics: TopicModel[];
}

export class TrainerModel implements ITrainerModel{
    @ApiProperty()
    user: UserModel;

    @ApiProperty()
    topics: TopicModel[];
}
