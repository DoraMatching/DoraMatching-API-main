import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export interface ITagQuestionModel {
    name: string;
    createdAt?: string;
    updatedAt?: string;
}

export class TagQuestionModel implements ITagQuestionModel {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsDate()
    createdAt: string;

    @ApiProperty()
    @IsDate()
    updatedAt: string;
}
