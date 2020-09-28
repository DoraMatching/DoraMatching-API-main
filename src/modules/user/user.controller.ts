import { AppResources } from '@/app.roles';
import { grantPermission } from '@/shared/access-control/grant-permission';
import { rolesFilter } from '@/shared/access-control/roles-filter';
import { Auth } from '@/shared/auth/auth.decorator';
import { IPagination, Paginate, paginateFilter, PaginateParams, PaginateSwagger } from '@/shared/pagination';
import { FindOneParams } from '@/shared/pipes/find-one.params';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { CreateUserDTO, GithubUserLogin, IUserRO, JwtUser, LoginUserDTO, UpdateUser, UserRO } from './dto';
import { User } from './user.decorator';
import { UserService } from './user.service';

@Controller()
@ApiTags('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder
    ) { }

    @Auth()
    @ApiOperation({ summary: 'Get all users', description: 'Return 1 page of users' })
    @ApiResponse({ type: [UserRO], status: 200 })
    @PaginateSwagger()
    @Get('users')
    @UsePipes(ValidationPipe)
    async index(@Paginate({ route: 'users' }) pagOpts: PaginateParams, @User() user: JwtUser): Promise<IPagination<IUserRO>> {
        const permission = grantPermission(this.rolesBuilder, AppResources.USER, 'read', user, null);
        if (permission.granted) {
            const users = await this.userService.showAll(pagOpts);
            return paginateFilter(users, permission);
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    @Auth()
    @ApiOperation({ summary: 'Get user', description: 'Return user with :id' })
    @ApiResponse({ type: UserRO, status: 200 })
    @UsePipes(ValidationPipe)
    @Get('user/:id')
    async getUser(@Param() { id }: FindOneParams, @User() user: JwtUser): Promise<IUserRO> {
        const permission = grantPermission(this.rolesBuilder, AppResources.USER, 'read', user, id);
        if (permission.granted) {
            const foundUser = await this.userService.getUser({ id });
            return permission.filter(foundUser);
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    @Auth()
    @ApiOperation({ summary: 'Get user', description: 'Return user with :id' })
    @ApiResponse({ type: UserRO, status: 200 })
    @UsePipes(ValidationPipe)
    @Patch('user/:id')
    async updateUser(@Param() { id }: FindOneParams, @User() user: JwtUser, @Body() updateUser: UpdateUser): Promise<IUserRO> {
        const permission = grantPermission(this.rolesBuilder, AppResources.USER, 'update', user, id);
        if (permission.granted) {
            updateUser = permission.filter(updateUser);
            updateUser.roles = rolesFilter(user.roles, updateUser.roles);
            return await this.userService.updateUser(id, updateUser);
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    @ApiOperation({ summary: 'User basic login', description: 'Return user' })
    @ApiResponse({ type: UserRO, status: 200 })
    @UsePipes(ValidationPipe)
    @Post('login')
    login(@Body() data: LoginUserDTO): Promise<IUserRO> {
        return this.userService.login(data);
    }

    @Auth()
    @ApiOperation({ summary: 'Create user', description: 'Return user created' })
    @ApiResponse({ type: UserRO, status: 201 })
    @Post('register')
    @UsePipes(ValidationPipe)
    register(@Body() data: CreateUserDTO, @User() user: JwtUser): Promise<IUserRO> {
        const permission = grantPermission(this.rolesBuilder, AppResources.USER, 'create', user, null);
        if (permission.granted) {
            data = permission.filter(data);
            return this.userService.register(data);
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    @ApiOperation({ summary: 'User Github login' })
    @ApiResponse({ type: UserRO, status: 200 })
    @Post('github')
    @UsePipes(ValidationPipe)
    githubLogin(@Body() { accessToken }: GithubUserLogin) {
        return this.userService.githubLogin(accessToken);
    }

    @ApiOperation({ summary: `Utils`, description: 'Get repos of current user' })
    @Post('github/langs')
    githubLangs(@Body() { accessToken }: GithubUserLogin) {
        return this.userService.githubLangs(accessToken);
    }

    @Auth({ resource: AppResources.USER, action: 'read', possession: 'any' })
    @ApiOperation({ summary: `Utils`, description: 'Get JWT payload user token' })
    @Get('viewer')
    viewer(
        @User() user: JwtUser
    ) {
        return user;
    }
}
