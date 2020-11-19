import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@/shared/auth';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';
import { CreateLessonDTO } from '@lesson/dto/create-lesson.dto';
import { FindOneParams } from '@/shared';
import { LessonParam } from '@lesson/lesson.param';
import { LessonService } from '@lesson/lesson.service';

@ApiTags('lesson')
@Controller()
export class LessonController {
    constructor(
      private readonly lessonService: LessonService,
    ) {
    }

    @Auth()
    @Post('classe/:id/lesson')
    createLessonByClasseId(@Param() { id }: FindOneParams, @Body() data: CreateLessonDTO, @User() jwtUser: JwtUser) {
        return this.lessonService.createLessonByClasseId(id, data, jwtUser);
    }

    @Auth()
    @Get('classe/:id/lessons')
    getAllLessonByClasseId(@Param() { id }: FindOneParams, @User() jwtUser: JwtUser) {

    }

    @Auth()
    @Get('classe/:id/lesson/:lessonId')
    getLessonByLessonId(@Param() { id }: FindOneParams, @User() jwtUser: JwtUser) {

    }

    @Auth()
    @Patch('classe/:id/lesson/:lessonId')
    updateLessonByLessonId(@Param() { id }: FindOneParams, @Param() { lessonId }: LessonParam, @User() jwtUser: JwtUser) {

    }

    @Auth()
    @Delete('classe/:id/lesson/:lessonId')
    deleteLessonByLessonId(@Param() { id }: FindOneParams, @Param() { lessonId }: LessonParam, @User() jwtUser: JwtUser) {

    }
}
