import { Exclude, Expose } from 'class-transformer';

export interface IZoomApiRO {
    id: string;
    hostEmail: string;
    topic: string;
    type: number;
    status: string;
    timezone: string;
    createdAt: string;
    startUrl: string;
    joinUrl: string;
    password: string;
}

@Exclude()
export class ZoomApiRO implements IZoomApiRO {
    @Expose()
    id: string;

    @Expose()
    uuid: string;

    @Expose()
    hostEmail: string;

    @Expose()
    topic: string;

    @Expose()
    type: number;

    @Expose()
    status: string;

    @Expose()
    timezone: string;

    @Expose()
    startUrl: string;

    @Expose()
    joinUrl: string;

    @Expose()
    password: string;

    @Expose()
    createdAt: string;
}
