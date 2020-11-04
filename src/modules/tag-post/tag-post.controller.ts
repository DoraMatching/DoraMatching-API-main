import { Auth, IPagination, PaginateParams } from '@/shared';
import { ITagPostRO, TagPostRO } from '@tag-post/dto';
import { User } from '@user/user.decorator';
import { Controller, Get, Query } from '@nestjs/common';
import { TagPostService } from '@tag-post/tag-post.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { apiUrl } from '@/config';
import { JwtUser } from '@user/dto';

@ApiTags('tag-post')
@Controller()
export class TagPostController {
    constructor(
      private readonly tagPostService: TagPostService,
    ) {
    }

    @Auth()
    @ApiOperation({ summary: 'Get all tag-posts', description: 'Return 1 page of tag-post' })
    @ApiResponse({ type: [TagPostRO], status: 200 })
    @Get('tag-post')
    getTagPost(@Query() pagOpts: PaginateParams, @User() jwtUser: JwtUser): Promise<IPagination<ITagPostRO>> {
        return this.tagPostService.getAllTags({ ...pagOpts, route: `${apiUrl}/tag-post` }, jwtUser);
    }
}
