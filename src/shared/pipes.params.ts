import { IsIn, IsInt, IsNotEmpty, IsNumberString, IsString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export type Order = 'ASC' | 'DESC' | 1 | -1;

export class FindOneParams {
    @ApiProperty()
    @IsNumberString()
    id: number;
}

export class PaginateParams {
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    page?: number = 1;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(50)
    @Type(() => Number)
    limit?: number = 20;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsIn(['DESC', 'ASC'])
    order?: Order = 'DESC';

    route: string;
}