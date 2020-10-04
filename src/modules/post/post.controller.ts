import { apiUrl } from '@/config';
import {
    Body, Controller, Delete,
    Get, HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post, Query
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePostDTO } from '@post/dto/update-post.dto';
import { Auth } from '@shared/auth/auth.decorator';
import { DeleteResultDTO, IDeleteResultDTO } from '@shared/dto/delete-result-response.dto';
import { IPagination, PaginateParams } from '@shared/pagination/';
import { FindOneParams } from '@shared/pipes/find-one.params';
import { JwtUser } from '@user/dto/';
import { User } from '@user/user.decorator';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { CreatePostDTO, IPostRO, PostRO } from './dto';
import { PostService } from './post.service';

@Controller()
@ApiTags('post')
export class PostController {
    constructor(
        private readonly postService: PostService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ) {
    }

    @Auth()
    @ApiOperation({ summary: 'Get all posts', description: 'Return 1 page of posts' })
    @ApiResponse({ type: [PostRO], status: 200 })
    @Get('posts')
    index(@Query() pagOpts: PaginateParams, @User() jwtUser: JwtUser): Promise<IPagination<IPostRO>> {
        return this.postService.getAllPosts({ ...pagOpts, route: `${apiUrl}/posts` }, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Get post by :id', description: 'Return 1 post with :id' })
    @ApiResponse({ type: PostRO, status: 200 })
    @Get('post/:id')
    getPostById(@Param() { id }: FindOneParams, @User() jwtUser: JwtUser): Promise<IPostRO> {
        return this.postService.findOne(id, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Delete post by :id', description: 'Return a delete status message' })
    @ApiResponse({ type: DeleteResultDTO, status: 204 })
    @HttpCode(HttpStatus.ACCEPTED)
    @Delete('post/:id')
    async deletePostById(@Param() { id }: FindOneParams, @User() jwtUser: JwtUser): Promise<IDeleteResultDTO> {
        return this.postService.deletePostById(id, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Create post', description: 'Return post created' })
    @ApiResponse({ type: PostRO, status: 201 })
    @Post('post')
    async createPost(@Body() data: CreatePostDTO, @User() user: JwtUser): Promise<PostRO> {
        return this.postService.createPost(data, user);
    }

    @Auth()
    @ApiOperation({ summary: 'Update post', description: 'Return post updated' })
    @ApiResponse({ type: PostRO, status: 201 })
    @Patch('post/:id')
    updatePostById(@Param() { id }: FindOneParams, @Body() data: UpdatePostDTO, @User() jwtUser: JwtUser): Promise<PostRO> {
        return this.postService.updatePost(id, data, jwtUser);
    }
}
