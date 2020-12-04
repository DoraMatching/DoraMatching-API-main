import { apiUrl } from '@/config';
import { FindOneParams, PaginateParams } from '@/shared';
import { Auth } from '@/shared/auth';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TraineeRO } from '@trainee/dto';
import { TraineeService } from '@trainee/trainee.service';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';
import { UserQuery } from '@user/user.query';

@ApiTags('trainee')
@Controller()
export class TraineeController {
    constructor(private readonly traineeService: TraineeService) {}

    @Auth()
    @ApiOperation({
        summary: 'Get all trainees',
        description: 'Return 1 page of trainees',
    })
    @ApiResponse({ type: TraineeRO, status: 200 })
    @Get('trainees')
    getAllTrainees(@Query() pagOpts: PaginateParams, @User() jwtUser: JwtUser) {
        return this.traineeService.getAllTrainees(
            { ...pagOpts, route: `${apiUrl}/trainees` },
            jwtUser,
        );
    }

    @Auth()
    @ApiOperation({
        summary: 'Get trainee by :traineeId',
        description: 'Return a trainee with :traineeId',
    })
    @ApiResponse({ type: TraineeRO, status: 200 })
    @Get('trainee/:id')
    getTraineeById(
        @Param() { id: traineeId }: FindOneParams,
        @User() jwtUser: JwtUser,
    ) {
        return this.traineeService.getTraineeById(traineeId, jwtUser);
    }

    @Auth()
    @ApiOperation({
        summary: 'Get trainee by userId',
        description: 'Return a trainee with :userId',
    })
    @ApiResponse({ type: TraineeRO, status: 200 })
    @Get('trainee')
    getTraineeByUserId(
        @Query() { userId }: UserQuery,
        @User() jwtUser: JwtUser,
    ) {
        return this.traineeService.getTraineeByUserId(userId, jwtUser);
    }
}
