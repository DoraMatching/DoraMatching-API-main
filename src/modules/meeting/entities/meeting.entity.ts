import { extend } from 'lodash';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IMeetingModel } from '../dto';

@Entity('meeting')
export class MeetingEntity extends BaseEntity implements IMeetingModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    hostEmail: string;

    @Column({ type: 'text' })
    username: string;

    @Column({ type: 'timestamptz' })
    startTime: Date;

    @Column({ type: 'timestamptz' })
    endTime: Date;

    @Column({ type: 'int' })
    duration: number;

    @Column({ type: 'int' })
    totalMinutes: number;

    @Column({ type: 'int' })
    participantsCount: number;

    @Column({ type: 'text' })
    source: string;
}
