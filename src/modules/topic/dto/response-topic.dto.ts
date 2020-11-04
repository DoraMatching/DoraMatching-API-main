import { TrainerModel } from '@/modules/trainer/dto';
import { ApiProperty } from '@nestjs/swagger';
import { ITopicModel } from '@topic/dto';
import { UserModel } from '@user/dto';

export interface ITopicRO extends ITopicModel {
    id: string;
}

export class TopicRO implements ITopicRO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    featuredImage: string;

    @ApiProperty({ type: () => UserModel })
    author: TrainerModel;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ type: () => String, default: 'topic' })
    type?: string;
}
