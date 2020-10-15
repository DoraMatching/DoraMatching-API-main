import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { Auth } from '@shared/auth/auth.decorator';
import { CommentPostService } from '@comment-post/comment-post.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindOneParams } from '@shared/pipes/find-one.params';
import { User } from '@user/user.decorator';
import { JwtUser } from '@user/dto';
import { CommentPostParams, CreateCommentPostDTO, UpdateCommentPostDTO } from '@comment-post/dto';

@ApiTags('post')
@Controller()
export class CommentPostController {
    constructor(
      private readonly commentPostService: CommentPostService,
    ) {
    }

    @Auth()
    @ApiOperation({ summary: 'Create post comment', description: 'Create a comment with postId' })
    @Post('post/:id/comment')
    createComment(@Param() { id }: FindOneParams, @Body() data: CreateCommentPostDTO, @User() jwtUser: JwtUser) {
        return this.commentPostService.createComment(id, data, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Update post comment', description: 'Update post comment' })
    @Patch('/post/:id/comment/:commentId')
    updateComment(@Param() params: CommentPostParams, @Body() data: UpdateCommentPostDTO, @User() jwtUser: JwtUser) {
        return this.commentPostService.updateComment(params, data, jwtUser);
    }
}
