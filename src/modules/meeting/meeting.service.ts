import { Injectable } from '@nestjs/common';
import { JwtUser } from '@user/dto';
import { CreateMeetingDTO } from './dto';

@Injectable()
export class MeetingService {
    async createMeeting(data: CreateMeetingDTO, jwtUser: JwtUser) {}
}
