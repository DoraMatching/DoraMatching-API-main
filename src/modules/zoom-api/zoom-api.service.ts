import { zoomApiKey, zoomApiSecret } from '@/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtUser } from '@user/dto';
import Axios from 'axios';
import camelcaseKey from 'camelcase-keys';
import { plainToClass } from 'class-transformer';
import jwt from 'jsonwebtoken';
import { CreateZoomMeetingDTO, ZoomApiRO } from './dto';

@Injectable()
export class ZoomApiService {
    generateZoomToken(): string {
        const payload = {
            iss: zoomApiKey,
            exp: new Date().getTime() + 5000,
        };

        return jwt.sign(payload, zoomApiSecret);
    }

    async createMeeting(req: CreateZoomMeetingDTO): Promise<ZoomApiRO> {
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

        try {
            const { data } = await Axios.post<ZoomApiRO>(
                `https://api.zoom.us/v2/users/${req.hostEmail ||
                    `tranphuquy19@gmail.com`}/meetings`,
                payload,
                {
                    headers,
                    transformResponse: [
                        data => {
                            data = JSON.parse(data);
                            if (data.error)
                                throw new HttpException(
                                    `Couldn't create Zoom meeting room`,
                                    HttpStatus.NOT_FOUND,
                                );
                            data = camelcaseKey(data, { deep: true });
                            return plainToClass(ZoomApiRO, data);
                        },
                    ],
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
}
