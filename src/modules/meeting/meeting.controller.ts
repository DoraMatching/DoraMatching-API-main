import { Auth } from '@/shared/auth';
import { Body, Controller, Post } from '@nestjs/common';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';
import { CreateMeetingDTO } from './dto';
import { MeetingService } from './meeting.service';

@Controller('meeting')
export class MeetingController {
    constructor(private readonly meetingService: MeetingService) {}

    @Auth()
    @Post()
    createMeeting(@Body() data: CreateMeetingDTO, @User() jwtUser: JwtUser) {
        return this.meetingService.createMeeting(data, jwtUser);
    }
}
