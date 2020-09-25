import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindOneParams {
    @ApiProperty()
    @IsUUID()
    id: string;
}
