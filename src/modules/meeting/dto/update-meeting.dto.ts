import { IsNotEmpty, IsString } from 'class-validator';
import { IMeetingModel } from '.';

export type IUpdateMeetingDTO = Pick<IMeetingModel, 'uuid' | 'meetingId'>;

export class UpdateMeetingDTO implements IUpdateMeetingDTO {
    @IsNotEmpty()
    @IsString()
    uuid: string;

    @IsNotEmpty()
    @IsString()
    meetingId: string;
}
