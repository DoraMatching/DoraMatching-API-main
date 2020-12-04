import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class FindOneParams {
    @ApiProperty()
    @IsString()
    @IsUUID()
    id: string;
}
