export interface IMeetingModel {
    topic: string;
    hostEmail: string;
    agenda: string;
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
