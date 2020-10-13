import { apiUrl } from '@/config';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '@shared/auth/auth.decorator';
import { IPagination, PaginateParams } from '@shared/pagination';
import { TagPostRO } from '@tag-post/dto';
import { TagPostService } from '@tag-post/tag-post.service';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';

@ApiTags('tag-post')
@Controller('/tag-post')
export class TagPostController {
    constructor(
      private readonly tagPostService: TagPostService,
    ) {
    }

    @Auth()
    @ApiOperation({ summary: 'Get all tag-posts', description: 'Return 1 page of tag-post' })
    @ApiResponse({ type: [TagPostRO], status: 200 })
    @Get()
    getTagPost(@Query() pagOpts: PaginateParams, @User() jwtUser: JwtUser): Promise<IPagination<TagPostRO>> {
        return this.tagPostService.getAllTags({ ...pagOpts, route: `${apiUrl}/tag-post` }, jwtUser);
    }

    // @Auth()
    // @ApiOperation({ summary: 'Get all posts by tag id', description: 'Return 1 page of post' })
    // @ApiResponse({ type: [PostRO], status: 200 })
    // @Get(':id/posts')
    // getAllPostsByTagId(@Param() { id }: FindOneParams, @Query() pagOpts: PaginateParams, @User() jwtUser: JwtUser) {
    //     return this.tagPostService.getAllPostByTagId(id,{ ...pagOpts, route: `${apiUrl}/tag-post/${id}/posts` }, jwtUser);
    // }
}
