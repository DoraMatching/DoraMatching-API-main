import { UserModel } from '@/modules/user/dto';
import { ApiProperty } from '@nestjs/swagger';
import { ITopicModel } from '@topic/dto/topic.model';

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
    author: Partial<UserModel>;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ type: () => String, default: 'topic' })
    type?: string;
}
