import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export type Order = 'ASC' | 'DESC';

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
