import { IsNotEmpty, IsUUID } from 'class-validator';

export class LessonParam {
    @IsNotEmpty()
    @IsUUID()
    lessonId: string;
}
