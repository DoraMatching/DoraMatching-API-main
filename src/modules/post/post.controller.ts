import { AppResources } from '@/app.roles';
import { grantPermission } from '@/shared/access-control/grant-permission';
import { Auth } from '@/shared/auth/auth.decorator';
import { paginateFilter } from '@/shared/pagination/paginate-filter';
import { PaginateSwagger } from '@/shared/pagination/paginate-swagger.decorator';
import { Paginate } from '@/shared/pagination/paginate.decorator';
import { IPagination } from '@/shared/pagination/paginate.interface';
import { PaginateParams } from '@/shared/pagination/paginate.params';
import { Body, Controller, Get, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { JwtUser } from '../user/dto/';
import { User } from '../user/user.decorator';
import { PostRO, IPostRO } from './dto';
import { PostService } from './post.service';
import { CreatePostDTO } from './dto/create-post.dto';

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
