import { Auth } from '@/shared/auth';
import { Body, Controller, Post } from '@nestjs/common';
import { JwtUser } from '../user/dto';
import { User } from '../user/user.decorator';
import { CreateZoomMeetingDTO, ZoomApiRO } from './dto';
import { ZoomApiService } from './zoom-api.service';

@Controller('zoom-api')
export class ZoomApiController {
    constructor(private readonly zoomApiService: ZoomApiService) {}

    @Auth()
    @Post('create-meeting')
    createMeeting(
        @Body() req: CreateZoomMeetingDTO,
        @User() jwtUser: JwtUser,
    ): Promise<ZoomApiRO> {
        return this.zoomApiService.createMeeting(req, jwtUser);
    }
}
