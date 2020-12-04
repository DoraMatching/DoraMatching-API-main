import {
    FindOneParams,
    IDeleteResultDTO,
    IPagination,
    PaginateParams,
} from '@/shared';
import { Auth } from '@/shared/auth';
import { IClasseRO } from '@classe/dto';
import {
    CreateLessonDTO,
    ILessonRO,
    LessonRO,
    UpdateLessonDTO,
} from '@lesson/dto';
import { LessonService } from '@lesson/lesson.service';
import { TimeRangeQuery } from '@lesson/time-range.params';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';

@ApiTags('lesson')
@Controller()
export class LessonController {
    constructor(private readonly lessonService: LessonService) {}

    @Auth()
    @Post('classe/:id/lesson')
    createLessonByClasseId(
        @Param() { id }: FindOneParams,
        @Body() data: CreateLessonDTO,
        @User() jwtUser: JwtUser,
    ): Promise<IClasseRO> {
        return this.lessonService.createLessonByClasseId(id, data, jwtUser);
    }

    @Auth()
    @Get('classe/:id/lessons')
    getAllLessonByClasseId(
        @Param() { id }: FindOneParams,
        @Query() pagOpts: PaginateParams,
        @User() jwtUser: JwtUser,
    ): Promise<IPagination<ILessonRO>> {
        return this.lessonService.getAllLessonsByClasseId(id, pagOpts, jwtUser);
    }

    @Auth()
    @Get('lesson/:id')
    getLessonById(
        @Param() { id: lessonId }: FindOneParams,
        @User() jwtUser: JwtUser,
    ): Promise<ILessonRO> {
        return this.lessonService.getLessonById(lessonId, jwtUser);
    }

    @Auth()
    @Patch('lesson/:id')
    updateLessonById(
        @Param() { id: lessonId }: FindOneParams,
        @Body() data: UpdateLessonDTO,
        @User() jwtUser: JwtUser,
    ): Promise<ILessonRO> {
        return this.lessonService.updateLessonById(lessonId, data, jwtUser);
    }

    @Auth()
    @Delete('lesson/:id')
    deleteLessonById(
        @Param() { id: lessonId }: FindOneParams,
        @User() jwtUser: JwtUser,
    ): Promise<IDeleteResultDTO> {
        return this.lessonService.deleteLessonById(lessonId, jwtUser);
    }

    @Auth()
    @Get('trainer/:id/lessons')
    getTrainerLessons(
        @Param() { id: trainerId }: FindOneParams,
        @Query() timeRange: TimeRangeQuery,
        @User() jwtUser: JwtUser,
    ): Promise<ILessonRO[]> {
        return this.lessonService.getTrainerLessons(
            trainerId,
            timeRange,
            jwtUser,
        );
    }

    @Auth()
    @Get('trainee/:id/lessons')
    getTraineeLessons(
        @Param() { id: traineeId }: FindOneParams,
        @Query() timeRange: TimeRangeQuery,
        @User() jwtUser: JwtUser,
    ): Promise<LessonRO[]> {
        return this.lessonService.getTraineeLessons(
            traineeId,
            timeRange,
            jwtUser,
        );
    }
}
