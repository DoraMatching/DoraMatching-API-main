import { ILessonModel } from '@lesson/dto/lesson.model';
import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export type ICreateLessonDTO = Omit<ILessonModel, 'classe'>

export class CreateLessonDTO implements ICreateLessonDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    duration: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    startTime: Date;
}
