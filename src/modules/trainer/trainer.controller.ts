import { Controller, Get } from '@nestjs/common';
import { User } from '../user/user.decorator';
import { JwtUser } from '@user/dto';
import { TrainerService } from '@trainer/trainer.service';
import { Auth } from '@shared/auth/auth.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostRO } from '@post/dto';

@Controller('trainer')
export class TrainerController {
    constructor(
      private readonly trainerService: TrainerService
    ) {
    }

    @Auth()
    @ApiOperation({ summary: 'Register trainer', description: 'Return trainer relisted' })
    @ApiResponse({ type: PostRO, status: 200 })
    @Get('register')
    registerTrainer(@User() jwtUser: JwtUser) {
        return this.trainerService.registerTrainer(jwtUser);
    }
}
