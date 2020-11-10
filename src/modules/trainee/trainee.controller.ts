import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TraineeService } from '@trainee/trainee.service';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';
import { Auth } from '@/shared/auth';
import { PaginateParams } from '@/shared';
import { apiUrl } from '@/config';

@ApiTags('trainee')
@Controller()
export class TraineeController {
    constructor(
      private readonly traineeService: TraineeService,
    ) {
    }

    @Auth()
    @Get('trainees')
    getAllTrainees(@Query() pagOpts: PaginateParams, @User() jwtUser: JwtUser) {
        return this.traineeService.getAllTrainees({ ...pagOpts, route: `${apiUrl}/trainees` }, jwtUser);
    }
}
