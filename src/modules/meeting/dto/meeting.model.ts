export interface IMeetingModel {
    hostEmail: string;
    username: string;
    startTime: Date;
    endTime: Date;
    duration: number;
    totalMinutes: number;
    participantsCount: number;
    source: string;
}
