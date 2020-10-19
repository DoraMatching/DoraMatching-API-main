import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '@shared/auth/auth.decorator';
import { PaginateParams } from '@shared/pagination';
import { User } from '@user/user.decorator';
import { JwtUser } from '@user/dto';
import { TagQuestionRO } from '@/modules/tag-question/dto';
import { TagQuestionService } from '@/modules/tag-question/tag-question.service';
import { apiUrl } from '@/config';

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