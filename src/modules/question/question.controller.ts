import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostRO } from '@post/dto';
import { CreateQuestionDTO } from '@question/dto';
import { QuestionService } from '@question/question.service';
import { Auth } from '@shared/auth/auth.decorator';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';

@ApiTags('question')
@Controller()
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {

    }

    @Auth()
    @ApiOperation({ summary: 'Create post', description: 'Return post created' })
    @ApiResponse({ type: PostRO, status: 201 })
    @Post('question')
    createQuestion(@Body() data: CreateQuestionDTO, @User() jwtUser: JwtUser) {
        return this.questionService.createQuestion(data, jwtUser);
    }
}
