import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import moment from 'moment';

export class TimeRangeQuery {
    @ApiProperty()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @Transform(value => new Date(value))
    startTime?: Date = moment()
        .startOf('day')
        .toDate();

    @ApiProperty()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @Transform(value => new Date(value))
    endTime?: Date = moment()
        .endOf('day')
        .toDate();
}
