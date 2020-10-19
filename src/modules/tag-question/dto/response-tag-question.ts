import { ITagQuestionModel } from '@/modules/tag-question/dto/tag-question.model';
import { ApiProperty } from '@nestjs/swagger';

export type ITagQuestionRO = ITagQuestionModel;

export class TagQuestionRO implements ITagQuestionRO {
    @ApiProperty()
    name: string;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    updatedAt: string;
}
