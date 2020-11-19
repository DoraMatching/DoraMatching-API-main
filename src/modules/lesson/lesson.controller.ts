import { FindOneParams, PaginateParams } from '@/shared';
import { Auth } from '@/shared/auth';
import { CreateLessonDTO } from '@lesson/dto';
import { LessonParam } from '@lesson/lesson.param';
import { LessonService } from '@lesson/lesson.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';

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
    getAllLessonByClasseId(@Param() { id }: FindOneParams, @Query() pagOpts: PaginateParams, @User() jwtUser: JwtUser) {
        return this.lessonService.getAllLessonsByClasseId(id, pagOpts, jwtUser);
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
