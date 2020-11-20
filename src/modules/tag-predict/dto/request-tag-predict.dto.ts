import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum TagPredictAlgorithms {
    BOW = 'bow',
    TFIDF = 'tfidf'
}

export interface IRequestTagPredictDTO {
    predict: string;
}

export class RequestTagPredictDTO implements IRequestTagPredictDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    predict: string;
}

export class RequestTagQueryDTO {
    @ApiProperty({ enum: TagPredictAlgorithms, default: TagPredictAlgorithms.TFIDF })
    @IsOptional()
    @IsEnum(TagPredictAlgorithms, { message: `order must be one of the following values: ${Object.keys(TagPredictAlgorithms).join(', ')}` })
    algorithm: TagPredictAlgorithms;
}
