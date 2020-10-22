import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export interface ITagQuestionModel {
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class TagQuestionModel implements ITagQuestionModel {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsDate()
    createdAt: Date;

    @ApiProperty()
    @IsDate()
    updatedAt: Date;
}
