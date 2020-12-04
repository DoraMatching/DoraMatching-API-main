import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    ArrayMinSize,
    ArrayUnique,
    IsArray,
    IsOptional,
    IsString,
} from 'class-validator';

export enum SearchScopes {
    USER = 'USER',
    POST = 'POST',
    QUESTION = 'QUESTION',
}

export class SearchQuery {
    @ApiProperty()
    @IsString()
    key: string;

    @ApiProperty({ type: () => String, example: `["USER","POST","QUESTION"]` })
    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @ArrayMinSize(1)
    @Transform(values =>
        JSON.parse(values)
            .map(e => SearchScopes[e])
            .filter(Boolean),
    )
    scope: SearchScopes[] = [SearchScopes.USER];
}
