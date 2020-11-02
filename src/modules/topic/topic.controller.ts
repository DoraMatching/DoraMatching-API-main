import { apiUrl } from '@/config';
import { Auth } from '@/shared/auth/auth.decorator';
import { PaginateParams } from '@/shared/pagination';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtUser } from '../user/dto';
import { User } from '../user/user.decorator';
import { TopicRO } from './dto/response-topic.dto';
import { TopicService } from './topic.service';

@ApiTags('topic')
@Controller()
export class TopicController {
    constructor(private readonly topicService: TopicService) {

    }

    @Auth()
    @ApiOperation({ summary: 'Get all topics', description: 'Return 1 page of topics' })
    @ApiResponse({ type: [TopicRO], status: 200 })
    @Get('topics')
    index(@Query() pagOpts: PaginateParams, @User() jwtUser: JwtUser) {
        return this.topicService.getAllTopics({ ...pagOpts, route: `${apiUrl}/topics` }, jwtUser)
    }
}
