import { apiUrl } from '@/config';
import { PaginateParams } from '@/shared';
import { Auth } from '@/shared/auth';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagQuestionRO } from '@tag-question/dto';
import { TagQuestionService } from '@tag-question/tag-question.service';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';

@ApiTags('tag-question')
@Controller()
export class TagQuestionController {
    constructor(private readonly tagQuestionService: TagQuestionService) {}

    @Auth()
    @ApiOperation({
        summary: 'Get all tag-questions',
        description: 'Return 1 page of tag-question',
    })
    @ApiResponse({ type: [TagQuestionRO], status: 200 })
    @Get('tag-question')
    getAllTags(@Query() pagOpts: PaginateParams, @User() jwtUser: JwtUser) {
        return this.tagQuestionService.getAllTags(
            { ...pagOpts, route: `${apiUrl}/tag-question` },
            jwtUser,
        );
    }
}
