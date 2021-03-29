import { zoomApiKey, zoomApiSecret } from '@/config';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import Axios from 'axios';
import camelcaseKey from 'camelcase-keys';
import { plainToClass } from 'class-transformer';
import jwt from 'jsonwebtoken';
import { CreateZoomMeetingDTO, ZoomApiRO } from './dto';

@Injectable()
export class ZoomApiService {
    private readonly logger = new Logger(ZoomApiService.name);

    generateZoomToken(): string {
        const payload = {
            iss: zoomApiKey,
            exp: new Date().getTime() + 5000,
        };

        return jwt.sign(payload, zoomApiSecret);
    }

    transformMiddleware(data) {
        data = JSON.parse(data);
        if (data.error)
            throw new HttpException(`Couldn't create Zoom meeting room`, HttpStatus.NOT_FOUND);
        data = camelcaseKey(data, { deep: true });
        return plainToClass(ZoomApiRO, data);
    }

    async createMeeting(req: Partial<CreateZoomMeetingDTO>): Promise<ZoomApiRO> {
        const payload = {
            topic: req.topic,
            type: 1,
            settings: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                host_video: 'true',
                // eslint-disable-next-line @typescript-eslint/camelcase
                participant_video: 'true',
            },
        };

        const headers = {
            Authorization: `Bearer ${this.generateZoomToken()}`,
        };

        this.logger.debug(headers.Authorization);

        try {
            const { data } = await Axios.post<ZoomApiRO>(
                `https://api.zoom.us/v2/users/${req.hostEmail ||
                    `tranphuquy19@gmail.com`}/meetings`,
                payload,
                {
                    headers,
                    transformResponse: [this.transformMiddleware],
                },
            );
            return data;
        } catch ({ message }) {
            throw new HttpException(
                message || `OOPS! Can't create Zoom meeting room`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getMeeting(meetingId: string): Promise<ZoomApiRO> {
        const headers = {
            Authorization: `Bearer ${this.generateZoomToken()}`,
        };

        this.logger.debug(headers.Authorization);

        try {
            const { data } = await Axios.get<ZoomApiRO>(
                `https://api.zoom.us/v2/meetings/${meetingId}`,
                {
                    headers,
                    transformResponse: [this.transformMiddleware],
                },
            );
            return data;
        } catch ({ message }) {
            throw new HttpException(
                message || `OOPS! Can't get Zoom meeting room`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getPastMeeting(uuid: string) {
        const headers = {
            Authorization: `Bearer ${this.generateZoomToken()}`,
        };

        this.logger.debug(headers.Authorization);

        try {
            const { data } = await Axios.get(`https://api.zoom.us/v2/past_meetings/${uuid}`, {
                headers,
                transformResponse: [
                    data => {
                        data = JSON.parse(data);
                        if (data.error)
                            throw new HttpException(
                                `Couldn't create Zoom meeting room`,
                                HttpStatus.NOT_FOUND,
                            );
                        return camelcaseKey(data, { deep: true });
                    },
                ],
            });
            data.status = 'ended';
            return data;
        } catch ({ message }) {
            throw new HttpException(
                message || `OOPS! Can't get Zoom past meeting`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
