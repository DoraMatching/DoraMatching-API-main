import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateQuestionDTO, IQuestionRO, QuestionRO } from '@question/dto';
import { QuestionService } from '@question/question.service';
import { Auth } from '@shared/auth/auth.decorator';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';
import { IPagination, PaginateParams } from '@shared/pagination';

@ApiTags('question')
@Controller()
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {

    }

    @Auth()
    @ApiOperation({ summary: 'Get all questions', description: 'Return a page of questions' })
    @ApiResponse({ type: QuestionRO, status: 200 })
    @Get('questions')
    index(@Query() pagOpts: PaginateParams, @User() jwtUser: JwtUser): Promise<IPagination<IQuestionRO>> {
        return this.questionService.getAllQuestions(pagOpts, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Create question', description: 'Return a question created' })
    @ApiResponse({ type: QuestionRO, status: 201 })
    @Post('question')
    createQuestion(@Body() data: CreateQuestionDTO, @User() jwtUser: JwtUser): Promise<IQuestionRO> {
        return this.questionService.createQuestion(data, jwtUser);
    }
}
