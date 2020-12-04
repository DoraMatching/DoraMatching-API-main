import { ApiProperty } from '@nestjs/swagger';
import { ITagQuestionModel } from '@tag-question/dto';

export type ITagQuestionRO = ITagQuestionModel;

export class TagQuestionRO implements ITagQuestionRO {
    @ApiProperty()
    name: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ type: () => String, default: 'tag-question' })
    type?: string = 'tag-question';
}
