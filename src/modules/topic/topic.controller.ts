import { apiUrl } from '@/config';
import { Auth } from '@/shared/auth/auth.decorator';
import { PaginateParams } from '@/shared/pagination';
import { FindOneParams } from '@/shared/pipes/find-one.params';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtUser } from '../user/dto';
import { User } from '../user/user.decorator';
import { CreateTopicDTO } from './dto/create-topic.dto';
import { ITopicRO, TopicRO } from './dto/response-topic.dto';
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

    @Auth()
    @ApiOperation({ summary: 'Get topic by :id', description: 'Return 1 topic with :id' })
    @ApiResponse({ type: TopicRO, status: 200 })
    @Get('topic/:id')
    async getTopicById(@Param() { id }: FindOneParams, @User() jwtUser: JwtUser): Promise<ITopicRO> {
        return this.topicService.getTopicById(id, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Create topic', description: 'Return topic created' })
    @ApiResponse({ type: TopicRO, status: 201 })
    @Post('topic')
    createPost(@Body() data: CreateTopicDTO, @User() jwtUser: JwtUser): Promise<ITopicRO> {
        return this.topicService.createTopic(data, jwtUser);
    }
}
