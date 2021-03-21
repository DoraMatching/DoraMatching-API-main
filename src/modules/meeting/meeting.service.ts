import { AppResources } from '@/app.roles';
import { AppPermissionBuilder } from '@/shared';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TrainerRepository } from '@trainer/repositories';
import { JwtUser } from '@user/dto';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { CreateMeetingDTO } from './dto';
import { MeetingRepository } from './repositories';

@Injectable()
export class MeetingService {
    constructor(
        private readonly meetingRepository: MeetingRepository,
        private readonly trainerRepository: TrainerRepository,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ) {}

    async createMeeting(data: CreateMeetingDTO, jwtUser: JwtUser) {
        const [trainer] = await Promise.all([
            this.trainerRepository.getTrainerByUserId(jwtUser.id),
        ]);
        if (!trainer) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

        const permission = new AppPermissionBuilder()
            .setRolesBuilder(this.rolesBuilder)
            .setResourceName(AppResources.MEETING)
            .setAction('create')
            .setRequestUser(jwtUser)
            .build()
            .grant();

        if (permission.granted) {
            try {
                const newMeetings = this.meetingRepository.create({
                    ...data,
                    trainer,
                });
                return await this.meetingRepository.save(newMeetings);
            } catch (e) {
                throw new HttpException(
                    `Can't create meeting`,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }
}
