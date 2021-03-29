import { AppResources } from '@/app.roles';
import { AppPermissionBuilder } from '@/shared';
import scheduler from '@/shared/scheduler';
import { ClasseEntity } from '@classe/entities';
import { ClasseRepository } from '@classe/repositories';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { TrainerEntity } from '@trainer/entities';
import { TrainerRepository } from '@trainer/repositories';
import { JwtUser } from '@user/dto';
import { ZoomApiService } from '@zoom-api/zoom-api.service';
import moment from 'moment';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { CreateMeetingDTO, UpdateMeetingDTO } from './dto';
import { MeetingGateway } from './meeting.gateway';
import { MeetingRepository } from './repositories';

@Injectable()
export class MeetingService {
    private readonly logger = new Logger(MeetingService.name);

    constructor(
        private readonly meetingRepository: MeetingRepository,
        private readonly trainerRepository: TrainerRepository,
        private readonly zoomApiService: ZoomApiService,
        private readonly meetingGateway: MeetingGateway,
        private readonly classeRepository: ClasseRepository,
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

    async createMeeting(data: Partial<CreateMeetingDTO>, jwtUser: JwtUser) {
        const promises: Array<Promise<TrainerEntity | ClasseEntity>> = [
            this.trainerRepository.getTrainerByUserId(jwtUser.id),
        ];

        if (data.classeId) promises.push(this.classeRepository.getClasseById(data.classeId));

        const [trainer, classe]: Array<any> = await Promise.all(promises);
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
                if (classe) {
                    data.topic = classe.topic.name;
                    data.agenda = classe.name;
                }

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

                const newMeeting = this.meetingRepository.create({
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
                scheduler(
                    moment()
                        .add(3, 'seconds')
                        .toDate(),
                    () => {
                        this.meetingGateway.server.to(classe.id).emit(`msgToClient`, {
                            command: 'NEW_MEETING',
                            payload: newMeeting,
                        });
                    },
                );
                return await this.meetingRepository.save(newMeeting);
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
        const promises = [
            this.zoomApiService.getMeeting(data.meetingId),
            this.zoomApiService.getPastMeeting(data.uuid),
        ].map(p => p.catch(() => {}));

        const [zoomMeeting, zoomPassMeeting] = await Promise.all(promises);

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
        } = zoomMeeting || zoomPassMeeting;
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
