import { IsIn, IsInt, IsNumberString, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { apiUrl } from '../config/app.config';

export type Order = 'ASC' | 'DESC' | 1 | -1;

export class FindOneParams {
    @ApiProperty()
    @IsNumberString()
    id: number;
}

export class PaginateParams {
    @ApiProperty()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    page: number;

    @ApiProperty()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    limit: number;

    @ApiProperty()
    @IsString()
    @IsIn(['DESC', 'ASC'])
    order: Order;

    route: string;
}