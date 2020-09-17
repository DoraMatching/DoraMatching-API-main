import { Body, Controller, Get, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { apiUrl } from 'src/config';
import { AuthGuard } from 'src/shared/auth.guard';
import { PaginateParams } from 'src/shared/pipes.params';
import { UserDTO, UserRO } from './user.dto';
import { UserEntity } from './user.entity';
import { IPagination, UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private userService: UserService) { }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Read users' })
    @ApiResponse({ type: [UserRO], status: 200 })
    @Get('users')
    @UseGuards(new AuthGuard())
    @UsePipes(ValidationPipe)
    index(@Query() { limit, page, order }: PaginateParams): Promise<IPagination<UserRO>> {
        const route = `${apiUrl}/user`;
        return this.userService.showAll({ page: page || 1, limit: limit || 20, order: order || 'DESC', route });
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

    @Get('auth/github')
    githubCallback(@Req() req) {
        console.log(console.log(req));
    }
}
