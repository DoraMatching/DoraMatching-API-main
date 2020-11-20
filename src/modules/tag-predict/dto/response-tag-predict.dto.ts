import { ApiProperty } from '@nestjs/swagger';

export interface ITagPredictionRO {
    tags: string[];
}

export class TagPredictionRO implements ITagPredictionRO {
    @ApiProperty({example: ['php', 'vue-js']})
    tags: string[];
}
