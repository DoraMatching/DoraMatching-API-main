import { TopicEntity } from '@topic/entities';
import { TrainerModel } from '@trainer/dto';
import { UserEntity } from '@user/entities';
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
