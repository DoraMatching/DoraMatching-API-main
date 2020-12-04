import { ClasseModel } from '@classe/dto';
import { ILessonModel } from '@lesson/dto/lesson.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export type ILessonRO = ILessonModel;

export class LessonRO implements ILessonRO {
    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ type: () => ClasseModel })
    classe: ClasseModel;

    @ApiProperty()
    duration: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    startTime: Date;

    @ApiProperty({ default: 'lesson' })
    type: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
