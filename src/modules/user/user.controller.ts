import { apiUrl } from '@/config';
import { FindOneParams, IPagination, PaginateParams } from '@/shared';
import { Auth } from '@/shared/auth';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateUserDTO,
  GithubUserLogin,
  IUserRO,
  JwtUser,
  LoginUserDTO,
  UpdateUserDTO,
  UserRO,
} from '@user/dto';
import { User } from '@user/user.decorator';
import { UserService } from '@user/user.service';

@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Return 1 page of users',
  })
  @ApiResponse({ type: [UserRO], status: 200 })
  @Get('users')
  index(
    @Query() pagOpts: PaginateParams,
    @User() jwtUser: JwtUser,
  ): Promise<IPagination<IUserRO>> {
    return this.userService.showAll(
      { ...pagOpts, route: `${apiUrl}/users` },
      jwtUser,
    );
  }

  @Auth()
  @ApiOperation({
    summary: 'Get user by :userId',
    description: 'Return user with :id',
  })
  @ApiResponse({ type: UserRO, status: 200 })
  @Get('user/:id')
  getUser(
    @Param() { id }: FindOneParams,
    @User() jwtUser: JwtUser,
  ): Promise<IUserRO> {
    return this.userService.getUserById({ id }, jwtUser);
  }

  @Auth()
  @ApiOperation({
    summary: 'Update user by :userId',
    description: 'Return user with :id',
  })
  @ApiResponse({ type: UserRO, status: 200 })
  @Patch('user/:id')
  updateUser(
    @Param() { id }: FindOneParams,
    @User() jwtUser: JwtUser,
    @Body() updateUser: UpdateUserDTO,
  ): Promise<IUserRO> {
    return this.userService.updateUser(id, updateUser, jwtUser);
  }

  @ApiOperation({ summary: 'User basic login', description: 'Return user' })
  @ApiResponse({ type: UserRO, status: 200 })
  @Post('login')
  login(@Body() data: LoginUserDTO): Promise<IUserRO> {
    return this.userService.login(data);
  }

  @Auth()
  @ApiOperation({ summary: 'Create user', description: 'Return user created' })
  @ApiResponse({ type: UserRO, status: 201 })
  @Post('register')
  register(
    @Body() data: CreateUserDTO,
    @User() jwtUser: JwtUser,
  ): Promise<IUserRO> {
    return this.userService.register(data, jwtUser);
  }

  @ApiOperation({ summary: 'User Github login' })
  @ApiResponse({ type: UserRO, status: 200 })
  @Post('github')
  githubLogin(@Body() { accessToken }: GithubUserLogin) {
    return this.userService.githubLogin(accessToken);
  }

  @ApiOperation({ summary: `Utils`, description: 'Get repos of current user' })
  @Post('github/langs')
  githubLangs(@Body() { accessToken }: GithubUserLogin) {
    return this.userService.githubLangs(accessToken);
  }

  @Auth()
  @ApiOperation({ summary: `Utils`, description: 'Get JWT payload user token' })
  @Get('viewer')
  viewer(@User() user: JwtUser) {
    return user;
  }
}
