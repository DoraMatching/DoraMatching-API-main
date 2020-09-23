import { AppResources } from '@/app.roles';
import { Auth } from '@/shared/auth.decorator';
import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { apiUrl } from 'src/config';
import { PaginateParams } from 'src/shared/pipes.params';
import { User } from './user.decorator';
import { UserDTO, UserRO, GithubUserLogin } from './user.dto';
import { IPagination, UserService } from './user.service';

@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder
    ) { }

    @Auth({ resource: AppResources.USER, action: 'read', possession: 'any' })
    @ApiOperation({ summary: 'Read users' })
    @ApiResponse({ type: [UserRO], status: 200 })
    @Get('users')
    @UsePipes(ValidationPipe)
    async index(@Query() { limit, page, order }: PaginateParams, @User() user: UserDTO): Promise<IPagination<UserRO>> {
        const permission = this.rolesBuilder.can(user.roles).readAny(AppResources.USER);
        console.log(permission);
        if (permission.granted) {
            const route = `${apiUrl}/user`;
            return this.userService.showAll({ page: page || 1, limit: limit || 20, order: order || 'DESC', route });
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ type: UserRO, status: 200 })
    @Post('login')
    login(@Body() data: UserDTO): Promise<UserRO> {
        return this.userService.login(data);
    }

    @ApiOperation({ summary: 'User register' })
    @ApiResponse({ type: UserRO, status: 201 })
    @Post('register')
    @UsePipes(ValidationPipe)
    register(@Body() data: UserDTO): Promise<UserRO> {
        return this.userService.register(data);
    }

    @ApiOperation({ summary: 'User Github login' })
    @ApiResponse({ type: UserRO, status: 200 })
    @Post('github')
    @UsePipes(ValidationPipe)
    githubLogin(@Body() { accessToken }: GithubUserLogin) {
        return this.userService.githubLogin(accessToken);
    }

    @ApiOperation({ summary: `Get repos of current user` })
    @Post('github/langs')
    githubLangs(@Body() { accessToken }: GithubUserLogin) {
        return this.userService.githubLangs(accessToken);
    }

    @Auth({ resource: AppResources.USER, action: 'read', possession: 'any' })
    @Get('viewer')
    viewer(
        @User() user: UserDTO
    ) {
        return user;
    }
}
