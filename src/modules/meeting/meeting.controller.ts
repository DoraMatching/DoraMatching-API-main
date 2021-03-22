import { Auth } from '@/shared/auth';
import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';
import { CreateMeetingDTO, UpdateMeetingDTO } from './dto';
import { MeetingService } from './meeting.service';

@Controller('meeting')
export class MeetingController {
    constructor(private readonly meetingService: MeetingService) {}

    @Auth()
    @Post()
    createMeeting(@Body() data: CreateMeetingDTO, @User() jwtUser: JwtUser) {
        return this.meetingService.createMeeting(data, jwtUser);
    }

    @Auth()
    @Get('own')
    getOwnMeeting(@User() jwtUser: JwtUser) {
        return this.meetingService.getOwnMeeting(jwtUser);
    }

    @Auth()
    @Patch()
    updateMeeting(@Query() data: UpdateMeetingDTO, @User() jwtUser: JwtUser) {
        return this.meetingService.updateMeeting(data, jwtUser);
    }
}
