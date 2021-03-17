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

export class ZoomApiRO implements IZoomApiRO {
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
