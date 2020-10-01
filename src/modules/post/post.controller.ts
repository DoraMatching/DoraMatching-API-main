import { AppResources } from '@/app.roles';
import { apiUrl } from '@/config';
import {
    Body, Controller, Delete,
    Get, HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post, Query
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePostDTO } from '@post/dto/update-post.dto';
import { grantPermission } from '@shared/access-control/grant-permission';
import { Auth } from '@shared/auth/auth.decorator';
import { DeleteResultDTO, IDeleteResultDTO } from '@shared/dto/delete-result-response.dto';
import { IPagination, paginateFilter, PaginateParams } from '@shared/pagination/';
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
    async index(@Query() pagOpts: PaginateParams, @User() user: JwtUser): Promise<IPagination<IPostRO>> {
        const permission = grantPermission(this.rolesBuilder, AppResources.POST, 'read', user, null);
        if (permission.granted) {
            const posts = await this.postService.getAllPosts({ ...pagOpts, route: `${apiUrl}/posts` });
            return paginateFilter(posts, permission);
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    @Auth()
    @ApiOperation({ summary: 'Get post by :id', description: 'Return 1 post with :id' })
    @ApiResponse({ type: PostRO, status: 200 })
    @Get('post/:id')
    async getPostByID(@User() user: JwtUser, @Param() { id }: FindOneParams): Promise<IPostRO> {
        const foundPost = await this.postService.findOne(id);
        const permissions = grantPermission(this.rolesBuilder, AppResources.POST, 'read', user, foundPost.author.id);
        if (permissions.granted) {
            return permissions.filter(foundPost);
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    @Auth()
    @ApiOperation({ summary: 'Delete post by :id', description: 'Return a message' })
    @ApiResponse({ type: DeleteResultDTO, status: 204 })
    @HttpCode(HttpStatus.ACCEPTED)
    @Delete('post/:id')
    async deletePostById(@User() user: JwtUser, @Param() { id }: FindOneParams): Promise<IDeleteResultDTO> {
        const foundPost = await this.postService.findOne(id);
        const permissions = grantPermission(this.rolesBuilder, AppResources.POST, 'delete', user, foundPost.author.id);
        if (permissions.granted) {
            await this.postService.deletePostById(foundPost.id);
            return {
                message: `Delete post with id: ${foundPost.id}`,
            };
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
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
    async updatePost(@Body() data: UpdatePostDTO, @User() user: JwtUser, @Param() { id }: FindOneParams): Promise<PostRO> {
        const post = await this.postService.findOne(id);
        const permissions = grantPermission(this.rolesBuilder, AppResources.POST, 'update', user, post.author.id);
        if (permissions.granted) {
            const updatedPost = await this.postService.updatePost(id, data);
            return permissions.filter(updatedPost);
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }
}
