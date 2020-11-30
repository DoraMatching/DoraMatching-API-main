import { SearchScopeValidator } from '@/shared';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';

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
