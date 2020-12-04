import { FindOneParams } from '@/shared';
import { Auth } from '@/shared/auth';
import { CommentPostService } from '@comment-post/comment-post.service';
import {
    CommentPostParam,
    CreateCommentPostDTO,
    UpdateCommentPostDTO,
} from '@comment-post/dto';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';

@ApiTags('post-comment')
@Controller()
export class CommentPostController {
    constructor(private readonly commentPostService: CommentPostService) {}

    @Auth()
    @ApiOperation({
        summary: 'Create post-comment by :postId and :commentId',
        description: 'Create a comment with postId',
    })
    @Post('post/:id/comment')
    createComment(
        @Param() { id }: FindOneParams,
        @Body() data: CreateCommentPostDTO,
        @User() jwtUser: JwtUser,
    ) {
        return this.commentPostService.createComment(id, data, jwtUser);
    }

    @Auth()
    @ApiOperation({
        summary: 'Update post-comment by :postId and :commentId',
        description: 'Update post comment',
    })
    @Patch('/post/:id/comment/:commentId')
    updateCommentById(
        @Param() params: CommentPostParam,
        @Body() data: UpdateCommentPostDTO,
        @User() jwtUser: JwtUser,
    ) {
        return this.commentPostService.updateCommentById(params, data, jwtUser);
    }

    @Auth()
    @ApiOperation({
        summary: 'Delete post-comment by :postId and :commentId',
        description: 'Return delete status',
    })
    @Delete('/post/:id/comment/:commentId')
    deleteCommentById(
        @Param() params: CommentPostParam,
        @User() jwtUser: JwtUser,
    ) {
        return this.commentPostService.deleteCommentById(params, jwtUser);
    }
}
