import { AppResources } from '@/app.roles';
import { Auth } from '@/shared/auth.decorator';
import { Body, Controller, Get, Post, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { PaginateParams } from 'src/shared/pipes.params';
import { User } from './user.decorator';
import { UserDTO, GithubUserLogin } from './dto/user.dto';
import { UserRO } from './dto/response-user.dto';
import { IPagination, UserService } from './user.service';
import { Paginate } from '@/shared/paginate.decorator';
import { PaginateSwagger } from '@/shared/paginate-swagger.decorator';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';

@Controller()
@ApiTags('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder
    ) { }

    @Auth({ resource: AppResources.USER, action: 'read', possession: 'any' })
    @ApiOperation({ summary: 'Get users', description: 'Return 1 page of users' })
    @ApiResponse({ type: [UserRO], status: 200 })
    @PaginateSwagger()
    @Get('users')
    @UsePipes(ValidationPipe)
    async index(@Paginate({ route: 'user' }) pagOpts: PaginateParams, @User() user: UserDTO): Promise<IPagination<UserRO>> {
        const permission = this.rolesBuilder.can(user.roles).readAny(AppResources.USER);
        if (permission.granted) {
            const { items, ...res } = await this.userService.showAll(pagOpts);
            const _items = permission.filter(items);
            return { items: _items, ...res };
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    @ApiOperation({ summary: 'User basic login', description: 'Return user' })
    @ApiResponse({ type: UserRO, status: 200 })
    @UsePipes(ValidationPipe)
    @Post('login')
    login(@Body() data: LoginUserDTO): Promise<UserRO> {
        return this.userService.login(data);
    }

    @ApiOperation({ summary: 'Create user', description: 'Return user created' })
    @ApiResponse({ type: UserRO, status: 201 })
    @Post('register')
    @UsePipes(ValidationPipe)
    register(@Body() data: CreateUserDTO): Promise<UserRO> {
        return this.userService.register(data);
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
        @User() user: UserDTO
    ) {
        return user;
    }
}
