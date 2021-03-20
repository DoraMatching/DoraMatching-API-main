import { Auth } from '@/shared/auth';
import { Controller, Post } from '@nestjs/common';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';

@Controller('meeting')
export class MeetingController {
    @Auth()
    @Post()
    createMeeting(@User() jwtUser: JwtUser) {}
}
