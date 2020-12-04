import { apiUrl } from '@/config';
import {
    DeleteResultDTO,
    FindOneParams,
    IDeleteResultDTO,
    PaginateParams,
} from '@/shared';
import { Auth } from '@/shared/auth';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTopicDTO, ITopicRO, TopicRO, UpdateTopicDTO } from '@topic/dto';
import { TopicService } from '@topic/topic.service';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';
import { ClasseRO } from '@classe/dto';

@ApiTags('topic')
@Controller()
export class TopicController {
    constructor(private readonly topicService: TopicService) {}

    @Auth()
    @ApiOperation({
        summary: 'Get all topics',
        description: 'Return 1 page of topics',
    })
    @ApiResponse({ type: [TopicRO], status: 200 })
    @Get('topics')
    index(@Query() pagOpts: PaginateParams, @User() jwtUser: JwtUser) {
        return this.topicService.getAllTopics(
            { ...pagOpts, route: `${apiUrl}/topics` },
            jwtUser,
        );
    }

    @Auth()
    @ApiOperation({
        summary: 'Get topic by :topicId',
        description: 'Return 1 topic with :id',
    })
    @ApiResponse({ type: TopicRO, status: 200 })
    @Get('topic/:id')
    async getTopicById(
        @Param() { id }: FindOneParams,
        @User() jwtUser: JwtUser,
    ): Promise<ITopicRO> {
        return this.topicService.getTopicById(id, jwtUser);
    }

    @Auth()
    @ApiOperation({
        summary: 'Get classes by :topicId',
        description: 'Return 1 page of classes with :topicId',
    })
    @ApiResponse({ type: [ClasseRO], status: 200 })
    @Get('topic/:id/classes')
    async getAllClasseByTopicId(
        @Query() pagOpts: PaginateParams,
        @Param() { id }: FindOneParams,
        @User() jwtUser: JwtUser,
    ) {
        return this.topicService.getAllClassesByTopicId(
            { ...pagOpts, route: `${apiUrl}/topic/${id}/classes` },
            id,
            jwtUser,
        );
    }

    @Auth()
    @ApiOperation({
        summary: 'Create topic',
        description: 'Return topic created',
    })
    @ApiResponse({ type: TopicRO, status: 201 })
    @Post('topic')
    createTopic(
        @Body() data: CreateTopicDTO,
        @User() jwtUser: JwtUser,
    ): Promise<ITopicRO> {
        return this.topicService.createTopic(data, jwtUser);
    }

    @Auth()
    @ApiOperation({
        summary: 'Update topic by :topicId',
        description: 'Return topic updated',
    })
    @ApiResponse({ type: TopicRO, status: 201 })
    @Patch('topic/:id')
    updateTopicById(
        @Param() { id }: FindOneParams,
        @Body() data: UpdateTopicDTO,
        @User() jwtUser: JwtUser,
    ): Promise<ITopicRO> {
        return this.topicService.updateTopicById(id, data, jwtUser);
    }

    @Auth()
    @ApiOperation({
        summary: 'Delete topic by :id',
        description: 'Return a delete status message',
    })
    @ApiResponse({ type: DeleteResultDTO, status: 204 })
    @HttpCode(HttpStatus.ACCEPTED)
    @Delete('topic/:id')
    deleteTopicById(
        @Param() { id }: FindOneParams,
        @User() jwtUser: JwtUser,
    ): Promise<IDeleteResultDTO> {
        return this.topicService.deleteTopicById(id, jwtUser);
    }
}
