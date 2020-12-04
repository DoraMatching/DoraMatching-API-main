import { ILessonModel } from '@lesson/dto/lesson.model';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export type IUpdateLessonDTO = Pick<
    ILessonModel,
    'name' | 'startTime' | 'duration'
>;

export class UpdateLessonDTO implements IUpdateLessonDTO {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    duration: number;

    @IsOptional()
    @IsDate()
    @Transform(value => (value ? new Date(value) : undefined))
    startTime: Date;
}
