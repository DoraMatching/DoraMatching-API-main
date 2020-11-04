import { ClasseEntity } from '@/modules/classe/entities/classe.entity';
import { TopicEntity } from '@/modules/topic/entities/topic.entity';
import { ITrainerModel, TrainerModel } from '@trainer/dto';
import { UserEntity } from '@user/entities/user.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn, JoinTable,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('trainer')
export class TrainerEntity extends BaseEntity implements TrainerModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
