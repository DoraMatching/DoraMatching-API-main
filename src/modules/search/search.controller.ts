import { Auth } from '@/shared/auth';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchQuery } from '@search/search.query';
import { SearchService } from '@search/search.service';

@ApiTags('search')
@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Auth()
    @ApiOperation({ summary: 'Search USER | POST | QUESTION' })
    @Get()
    search(@Query() scopes: SearchQuery) {
        return this.searchService.search(scopes);
    }
}
