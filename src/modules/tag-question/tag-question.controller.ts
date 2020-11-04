import { TagQuestionService } from '@tag-question/tag-question.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@user/user.decorator';
import { apiUrl } from '@/config';
import { Auth, PaginateParams } from '@/shared';
import { Controller, Get, Query } from '@nestjs/common';
import { JwtUser } from '@user/dto';
import { TagQuestionRO } from '@tag-question/dto';

@ApiTags('tag-question')
@Controller()
export class TagQuestionController {
    constructor(private readonly tagQuestionService: TagQuestionService) {
    }

    @Auth()
    @ApiOperation({ summary: 'Get all tag-questions', description: 'Return 1 page of tag-question' })
    @ApiResponse({ type: [TagQuestionRO], status: 200 })
    @Get('tag-question')
    getAllTags(@Query() pagOpts: PaginateParams, @User() jwtUser: JwtUser) {
        return this.tagQuestionService.getAllTags({ ...pagOpts, route: `${apiUrl}/tag-question` }, jwtUser);
    }
}
