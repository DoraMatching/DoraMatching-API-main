export interface IMeetingModel {
    topic: string;
    hostEmail: string;
    uuid: string;
    meetingId: string;
    startTime: Date;
    endTime: Date;
    duration: number;
    totalMinutes: number;
    participantsCount: number;
    source: string;
    password: string;
}
