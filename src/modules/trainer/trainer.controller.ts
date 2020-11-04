
import { Controller, Get } from '@nestjs/common';
import { User } from '@user/user.decorator';
import { JwtUser } from '@user/dto';
import { TrainerService } from '@trainer/trainer.service';
import { Auth } from '@shared/auth/auth.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostRO } from '@post/dto';

@Controller()
export class TrainerController {
    constructor(
      private readonly trainerService: TrainerService
    ) {
    }

    @Auth()
    @Get('trainers')
    getAllTrainers(@User() jwtUser: JwtUser) {
        return this.trainerService.getAllTrainers(jwtUser);
    }

    @Auth()
    @ApiOperation({ summary: 'Register trainer', description: 'Return trainer relisted' })
    @ApiResponse({ type: PostRO, status: 200 })
    @Get('trainer/register')
    registerTrainer(@User() jwtUser: JwtUser) {
        return this.trainerService.registerTrainer(jwtUser);
    }
}
