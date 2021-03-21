import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TrainerRepository } from '@trainer/repositories';
import { JwtUser } from '@user/dto';
import { CreateMeetingDTO } from './dto';
import { MeetingRepository } from './repositories';

@Injectable()
export class MeetingService {
    constructor(private readonly meetingRepository: MeetingRepository, private readonly trainerRepository: TrainerRepository) { }

    async createMeeting(data: CreateMeetingDTO, jwtUser: JwtUser) {
        const [trainer] = await Promise.all([this.trainerRepository.getTrainerByUserId(jwtUser.id)]);
        if (!trainer) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        return { data };
    }
}
