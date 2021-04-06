import { TrainerEntity } from '@trainer/entities';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IMeetingModel } from '../dto';

@Entity('meeting')
export class MeetingEntity extends BaseEntity implements IMeetingModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    topic: string;

    @Column({ type: 'text', nullable: true })
    agenda: string;

    @Column({ type: 'text', nullable: true }) // Zoom Meeting UUID
    uuid: string;

    @Column({ type: 'text', nullable: true })
    meetingId: string;

    @Column({ type: 'text', nullable: true })
    password: string;

    @Column({ type: 'text', nullable: true })
    hostEmail: string;

    @Column({ type: 'timestamptz', nullable: true })
    startTime: Date;

    @Column({ type: 'timestamptz', nullable: true })
    endTime: Date;

    @Column({ type: 'int', nullable: true })
    duration: number;

    @Column({ type: 'int', nullable: true })
    totalMinutes: number;

    @Column({ type: 'int', nullable: true })
    participantsCount: number;

    @Column({ type: 'text', nullable: true })
    source: string;

    @Column({ type: 'text', nullable: true })
    status: string;

    @Column({ type: 'text', nullable: true })
    startUrl: string;

    @Column({ type: 'text', nullable: true })
    joinUrl: string;

    @ManyToOne(
        () => TrainerEntity,
        trainer => trainer.meetings,
    )
    trainer: TrainerEntity;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @Column({ type: 'text', default: 'meeting', nullable: false })
    type: string;
}
