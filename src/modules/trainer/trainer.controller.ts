import { apiUrl } from '@/config';
import { FindOneParams, IPagination, PaginateParams } from '@/shared';
import { Auth } from '@/shared/auth';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTrainerDTO, ITrainerRO, TrainerRO } from '@trainer/dto';
import { TrainerService } from '@trainer/trainer.service';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';
import { UserQuery } from '@user/user.query';
import { ClasseRO } from '@classe/dto';

@ApiTags('trainer')
@Controller()
export class TrainerController {
    constructor(private readonly trainerService: TrainerService) {}

    @Auth()
    @ApiOperation({
        summary: 'Get all trainers',
        description: 'Return 1 page of trainers',
    })
    @ApiResponse({ type: [TrainerRO], status: 200 })
    @Get('trainers')
    getAllTrainers(
        @Query() pagOpts: PaginateParams,
        @User() jwtUser: JwtUser,
    ): Promise<IPagination<ITrainerRO>> {
        return this.trainerService.getAllTrainers(
            { ...pagOpts, route: `${apiUrl}/trainers` },
            jwtUser,
        );
    }

    @Auth()
    @ApiOperation({
        summary: 'Get classes by :trainerId',
        description: 'Return 1 page of classes with :trainerId',
    })
    @ApiResponse({ type: [ClasseRO], status: 200 })
    @Get('trainer/:id/classes')
    async getAllClasseByTopicId(
        @Query() pagOpts: PaginateParams,
        @Param() { id }: FindOneParams,
        @User() jwtUser: JwtUser,
    ) {
        return this.trainerService.getAllClassesByTrainerId(
            { ...pagOpts, route: `${apiUrl}/trainer/${id}/classes` },
            id,
            jwtUser,
        );
    }

    @Auth()
    @ApiOperation({
        summary: 'Register trainer',
        description: 'Return a trainer registered',
    })
    @ApiResponse({ type: TrainerRO, status: 201 })
    @Post('trainer/register')
    registerTrainer(
        @Body() data: CreateTrainerDTO,
        @User() jwtUser: JwtUser,
    ): Promise<TrainerRO> {
        return this.trainerService.registerTrainer(data, jwtUser);
    }

    @Auth()
    @ApiOperation({
        summary: 'Get trainer by :trainerId',
        description: 'Return a trainer with :id',
    })
    @ApiResponse({ type: TrainerRO, status: 200 })
    @Get('trainer/:id')
    getTrainerById(
        @Param() { id }: FindOneParams,
        @User() jwtUser: JwtUser,
    ): Promise<TrainerRO> {
        return this.trainerService.getTrainerById(id, jwtUser);
    }

    @Auth()
    @ApiOperation({
        summary: 'Get trainer by :userId',
        description: 'Return a trainer with :id',
    })
    @ApiResponse({ type: TrainerRO, status: 200 })
    @Get('trainer')
    getTrainerByUserId(
        @Query() { userId }: UserQuery,
        @User() jwtUser: JwtUser,
    ): Promise<TrainerRO> {
        return this.trainerService.getTrainerByUserId(userId, jwtUser);
    }
}
