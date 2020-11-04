import { User } from '@user/user.decorator';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateTrainerDTO, TrainerRO } from '@trainer/dto';
import { TrainerService } from '@trainer/trainer.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { apiUrl } from '@/config';
import { Auth, PaginateParams } from '@/shared';
import { JwtUser } from '@user/dto';

@Controller()
export class TrainerController {
    constructor(
      private readonly trainerService: TrainerService,
    ) {
    }

    @Auth()
    @ApiOperation({ summary: 'Get all posts', description: 'Return 1 page of posts' })
    @ApiResponse({ type: [TrainerRO], status: 200 })
    @Get('trainers')
    getAllTrainers(@Query() pagOpts: PaginateParams, @User() jwtUser: JwtUser) {
        return this.trainerService.getAllTrainers({ ...pagOpts, route: `${apiUrl}/trainers` }, jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Register trainer', description: 'Return trainer relisted' })
    @ApiResponse({ type: TrainerRO, status: 200 })
    @Post('trainer/register')
    registerTrainer(@Body() data: CreateTrainerDTO, @User() jwtUser: JwtUser) {
        return this.trainerService.registerTrainer(data, jwtUser);
    }
}
