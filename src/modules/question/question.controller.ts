import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateQuestionDTO, QuestionRO } from '@question/dto';
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
    @ApiOperation({ summary: 'Create question', description: 'Return a question created' })
    @ApiResponse({ type: QuestionRO, status: 201 })
    @Post('question')
    createQuestion(@Body() data: CreateQuestionDTO, @User() jwtUser: JwtUser) {
        return this.questionService.createQuestion(data, jwtUser);
    }
}
