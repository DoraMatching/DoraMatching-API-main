import { AppResources } from '@/app.roles';
import { grantPermission } from '@/shared/access-control/grant-permission';
import { Auth } from '@/shared/auth/auth.decorator';
import { IPagination, Paginate, paginateFilter, PaginateParams, PaginateSwagger } from '@/shared/pagination/';
import { Body, Controller, Get, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { JwtUser } from '../user/dto/';
import { User } from '../user/user.decorator';
import { CreatePostDTO, IPostRO, PostRO } from './dto';
import { PostService } from './post.service';

@Controller()
export class PostController {
    constructor(
        private readonly postService: PostService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder
    ) { }

    @Auth()
    @ApiOperation({ summary: 'Get all posts', description: 'Return 1 page of posts' })
    @ApiResponse({ type: [PostRO], status: 200 })
    @PaginateSwagger()
    @Get('posts')
    @UsePipes(ValidationPipe)
    async index(@Paginate({ route: 'post' }) pagOpts: PaginateParams, @User() user: JwtUser): Promise<IPagination<IPostRO>> {
        const permission = grantPermission(this.rolesBuilder, AppResources.POST, 'read', user, null);
        if (permission.granted) {
            const posts = await this.postService.showAll(pagOpts);
            return paginateFilter(posts, permission);
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    @Auth()
    @Post('post')
    @UsePipes(ValidationPipe)
    async createPost(@Body() data: CreatePostDTO, @User() user: JwtUser): Promise<PostRO> {
        return this.postService.createPost(data, user);
    }
}
