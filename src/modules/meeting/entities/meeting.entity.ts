import { TrainerEntity } from '@/modules/trainer/entities';
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

    @Column({ type: 'text' })
    hostEmail: string;

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

    @ManyToOne(() => TrainerEntity, trainer => trainer.meetings)
    trainer: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @Column({ type: 'text', default: 'meeting', nullable: false })
    type: string;
}
