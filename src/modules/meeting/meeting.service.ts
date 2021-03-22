import { AppResources } from '@/app.roles';
import { AppPermissionBuilder } from '@/shared';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { TrainerRepository } from '@trainer/repositories';
import { JwtUser } from '@user/dto';
import { ZoomApiService } from '@zoom-api/zoom-api.service';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { CreateMeetingDTO, UpdateMeetingDTO } from './dto';
import { MeetingRepository } from './repositories';

@Injectable()
export class MeetingService {
    private readonly logger = new Logger(MeetingService.name);

    constructor(
        private readonly meetingRepository: MeetingRepository,
        private readonly trainerRepository: TrainerRepository,
        private readonly zoomApiService: ZoomApiService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ) {}

    async getOwnMeeting(jwtUser: JwtUser) {
        const trainer = await this.trainerRepository.getTrainerByUserId(jwtUser.id);

        if (!trainer) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

        const [meetings] = await Promise.all([
            this.meetingRepository.find({
                where: { trainer: trainer.id },
                order: { updatedAt: 'DESC' },
            }),
        ]);

        return meetings;
    }

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
                const zoomMeeting = await this.zoomApiService.createMeeting(data);

                const {
                    hostEmail,
                    id,
                    uuid,
                    status,
                    startUrl,
                    joinUrl,
                    password,
                } = zoomMeeting;

                const newMeetings = this.meetingRepository.create({
                    ...data,
                    hostEmail,
                    status,
                    startUrl,
                    joinUrl,
                    password,
                    uuid,
                    meetingId: id,
                    trainer,
                });
                return await this.meetingRepository.save(newMeetings);
            } catch (e) {
                throw new HttpException(
                    `Couldn't create meeting`,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async updateMeeting(data: UpdateMeetingDTO, jwtUser: JwtUser) {
        const zoomMeeting = await Promise.any([
            this.zoomApiService.getMeeting(data.meetingId),
            this.zoomApiService.getPastMeeting(data.uuid),
        ]);
        const meeting = await this.meetingRepository.findOne({
            where: { meetingId: data.meetingId },
        });
        const {
            startTime,
            endTime,
            duration,
            totalMinutes,
            participantsCount,
            source,
            status,
        } = zoomMeeting;
        Object.assign(meeting, {
            startTime,
            endTime,
            duration,
            totalMinutes,
            participantsCount,
            source,
            status,
        });

        return this.meetingRepository.save(meeting);
    }
}
