import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { TrainerModel } from '@trainer/dto';
import { TopicEntity } from '@topic/entities';
import { UserEntity } from '@user/entities';

@Entity('trainer')
export class TrainerEntity extends BaseEntity implements TrainerModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: true })
    trainerProfile: string;

    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'user' })
    user: UserEntity;

    @OneToMany(() => TopicEntity, topic => topic.author)
    topics: TopicEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column({ type: 'text', nullable: false, default: 'trainer' })
    type: string;
}
