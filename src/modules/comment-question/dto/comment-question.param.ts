import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CommentQuestionParam {
    @ApiProperty()
    @IsString()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsString()
    @IsUUID()
    commentId: string;
}
