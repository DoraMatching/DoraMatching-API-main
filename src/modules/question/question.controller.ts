import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateQuestionDTO, IQuestionRO, QuestionRO, UpdateQuestionDTO } from '@question/dto';
import { QuestionService } from '@question/question.service';
import { Auth } from '@shared/auth/auth.decorator';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';
import { IPagination, PaginateParams } from '@shared/pagination';
import { FindOneParams } from '@shared/pipes/find-one.params';
import { apiUrl } from '@/config';

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
        return this.questionService.getAllQuestions({ ...pagOpts, route: `${apiUrl}/questions` }, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Create question', description: 'Return a question created' })
    @ApiResponse({ type: QuestionRO, status: 201 })
    @Post('question')
    createQuestion(@Body() data: CreateQuestionDTO, @User() jwtUser: JwtUser): Promise<IQuestionRO> {
        return this.questionService.createQuestion(data, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Get a question', description: 'Return a question with :id' })
    @ApiResponse({ type: QuestionRO, status: 200 })
    @Get('question/:id')
    getQuestionById(@Param() { id }: FindOneParams, @User() jwtUser: JwtUser) {
        return this.questionService.getQuestionById(id, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Update question', description: 'Return a question updated' })
    @ApiResponse({ type: QuestionRO, status: 201 })
    @Patch('question/:id')
    updateQuestion(@Param() { id }: FindOneParams, @Body() data: UpdateQuestionDTO, @User() jwtUser: JwtUser) {
        return this.questionService.updateQuestion(id, data, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Delete question', description: 'Return a question delete message' })
    @ApiResponse({ type: QuestionRO, status: 202 })
    @Delete('question/:id')
    deleteQuestion(@Param() { id }: FindOneParams, @User() jwtUser: JwtUser) {
        return this.questionService.deleteQuestion(id, jwtUser);
    }
}
