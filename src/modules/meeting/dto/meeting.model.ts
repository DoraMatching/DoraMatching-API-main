export interface IMeetingModel {
    hostEmail: string;
    startTime: Date;
    endTime: Date;
    duration: number;
    totalMinutes: number;
    participantsCount: number;
    source: string;
}
