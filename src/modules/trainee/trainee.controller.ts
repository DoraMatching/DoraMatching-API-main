import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TraineeService } from '@trainee/trainee.service';
import { JwtUser, UserRO } from '@user/dto';
import { User } from '@user/user.decorator';
import { Auth } from '@/shared/auth';
import { FindOneParams, PaginateParams } from '@/shared';
import { apiUrl } from '@/config';
import { UserQuery } from '@user/user.query';
import { TraineeRO } from '@trainee/dto';

@ApiTags('trainee')
@Controller()
export class TraineeController {
    constructor(
      private readonly traineeService: TraineeService,
    ) {
    }

    @Auth()
    @ApiOperation({ summary: 'Get all trainees', description: 'Return 1 one page of trainees' })
    @ApiResponse({ type: TraineeRO, status: 200 })
    @Get('trainees')
    getAllTrainees(@Query() pagOpts: PaginateParams, @User() jwtUser: JwtUser) {
        return this.traineeService.getAllTrainees({ ...pagOpts, route: `${apiUrl}/trainees` }, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Get trainee by id', description: 'Return a trainee with :id' })
    @ApiResponse({ type: TraineeRO, status: 200 })
    @Get('trainee/:id')
    getTraineeById(@Query() { id }: FindOneParams, @User() jwtUser: JwtUser) {
        return this.traineeService.getTraineeById(id, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Get trainee by userId', description: 'Return a trainee with :userId' })
    @ApiResponse({ type: TraineeRO, status: 200 })
    @Get('trainee')
    getTraineeByUserId(@Query() { userId }: UserQuery, @User() jwtUser: JwtUser) {
        return this.traineeService.getTraineeByUserId(userId, jwtUser);
    }
}
