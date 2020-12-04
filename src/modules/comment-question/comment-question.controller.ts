import { FindOneParams, IDeleteResultDTO } from '@/shared';
import { Auth } from '@/shared/auth';
import { CommentQuestionService } from '@comment-question/comment-question.service';
import {
    CommentQuestionParam,
    CreateCommentQuestionDTO,
    ICommentQuestionRO,
    UpdateCommentQuestionDTO,
} from '@comment-question/dto';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IQuestionRO } from '@question/dto';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';

@ApiTags('question-comment')
@Controller()
export class CommentQuestionController {
    constructor(
        private readonly commentQuestionService: CommentQuestionService,
    ) {}

    @Auth()
    @ApiOperation({
        summary: 'Create question comment by :questionId',
        description: 'Create a comment with questionId',
    })
    @Post('question/:id/comment')
    createComment(
        @Param() { id }: FindOneParams,
        @Body() data: CreateCommentQuestionDTO,
        @User() jwtUser: JwtUser,
    ): Promise<IQuestionRO> {
        return this.commentQuestionService.createComment(id, data, jwtUser);
    }

    @Auth()
    @ApiOperation({
        summary: 'Update question comment by :questionId and :commentId',
        description: 'Update post comment',
    })
    @Patch('/question/:id/comment/:commentId')
    updateCommentById(
        @Param() params: CommentQuestionParam,
        @Body() data: UpdateCommentQuestionDTO,
        @User() jwtUser: JwtUser,
    ): Promise<ICommentQuestionRO> {
        return this.commentQuestionService.updateCommentById(
            params,
            data,
            jwtUser,
        );
    }

    @Auth()
    @ApiOperation({
        summary: 'Delete question comment by :questionId and :commentId',
        description: 'Return delete status',
    })
    @Delete('/question/:id/comment/:commentId')
    deleteCommentById(
        @Param() params: CommentQuestionParam,
        @User() jwtUser: JwtUser,
    ): Promise<IDeleteResultDTO> {
        return this.commentQuestionService.deleteCommentById(params, jwtUser);
    }
}
