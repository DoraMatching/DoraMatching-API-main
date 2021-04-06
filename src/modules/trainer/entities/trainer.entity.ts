import { ClasseEntity } from '@classe/entities';
import { MeetingEntity } from '@meeting/entities';
import { TopicEntity } from '@topic/entities';
import { ITrainerModel } from '@trainer/dto';
import { UserEntity } from '@user/entities';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('trainer')
export class TrainerEntity extends BaseEntity implements ITrainerModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: true })
    trainerProfile: string;

    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'user' })
    user: UserEntity;

    @OneToMany(
        () => TopicEntity,
        topic => topic.author,
    )
    topics: TopicEntity[];

    @OneToMany(
        () => ClasseEntity,
        classe => classe.trainer,
    )
    classes: ClasseEntity[];

    @OneToMany(
        () => MeetingEntity,
        meeting => meeting.trainer,
    )
    meetings: MeetingEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'text', nullable: false, default: 'trainer' })
    type: string;
}
