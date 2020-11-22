import { apiUrl } from '@/config';
import { DeleteResultDTO, FindOneParams, IDeleteResultDTO, IPagination, PaginateParams } from '@/shared';
import { Auth } from '@/shared/auth';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDTO, IPostRO, PostRO, UpdatePostDTO } from '@post/dto';
import { PostService } from '@post/post.service';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';

@ApiTags('post')
@Controller()
export class PostController {
    constructor(private readonly postService: PostService) {

    }

    @Auth()
    @ApiOperation({ summary: 'Get all posts', description: 'Return 1 page of posts' })
    @ApiResponse({ type: [PostRO], status: 200 })
    @Get('posts')
    index(@Query() pagOpts: PaginateParams, @User() jwtUser: JwtUser): Promise<IPagination<IPostRO>> {
        return this.postService.getAllPosts({ ...pagOpts, route: `${apiUrl}/posts` }, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Get post by :postId', description: 'Return 1 post with :id' })
    @ApiResponse({ type: PostRO, status: 200 })
    @Get('post/:id')
    getPostById(@Param() { id }: FindOneParams, @User() jwtUser: JwtUser): Promise<IPostRO> {
        return this.postService.getPostById(id, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Delete post by :postId', description: 'Return a delete status message' })
    @ApiResponse({ type: DeleteResultDTO, status: 204 })
    @HttpCode(HttpStatus.ACCEPTED)
    @Delete('post/:id')
    deletePostById(@Param() { id }: FindOneParams, @User() jwtUser: JwtUser): Promise<IDeleteResultDTO> {
        return this.postService.deletePostById(id, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Create post', description: 'Return post created' })
    @ApiResponse({ type: PostRO, status: 201 })
    @Post('post')
    createPost(@Body() data: CreatePostDTO, @User() jwtUser: JwtUser): Promise<IPostRO> {
        return this.postService.createPost(data, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Update post by :postId', description: 'Return post updated' })
    @ApiResponse({ type: PostRO, status: 201 })
    @Patch('post/:id')
    updatePostById(@Param() { id }: FindOneParams, @Body() data: UpdatePostDTO, @User() jwtUser: JwtUser): Promise<IPostRO> {
        return this.postService.updatePostById(id, data, jwtUser);
    }
}
