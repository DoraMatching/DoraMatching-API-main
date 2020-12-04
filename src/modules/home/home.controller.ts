import { apiUrl } from '@/config';
import { IPagination, PaginateParams } from '@/shared';
import { Auth } from '@/shared/auth';
import { IHomeRO } from '@home-modules/dto';
import { HomeService } from '@home-modules/home.service';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostRO } from '@post/dto';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';

@ApiTags('home')
@Controller('home')
export class HomeController {
    constructor(private readonly homeService: HomeService) {}

    @Auth()
    @ApiOperation({
        summary: 'Get all posts | questions | users',
        description:
            'Return 1 page of posts | questions | users. <p><b>Note: reponse_limit = request_limit * 3</b></p>',
    })
    @ApiResponse({ type: [PostRO], status: 200 })
    @Get()
    index(
        @Query() pagOpts: PaginateParams,
        @User() jwtUser: JwtUser,
    ): Promise<IPagination<IHomeRO>> {
        return this.homeService.getAll(
            { ...pagOpts, route: `${apiUrl}/home` },
            jwtUser,
        );
    }
}
