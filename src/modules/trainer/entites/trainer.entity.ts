import { ClasseEntity } from '@/modules/classe/entities/classe.entity';
import { TopicEntity } from '@/modules/topic/entities/topic.entity';
import { ITrainerModel, TrainerModel } from '@trainer/dto';
import { UserEntity } from '@user/entities/user.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('trainer')
export class TrainerEntity extends BaseEntity implements TrainerModel {
    @PrimaryGeneratedColumn()
    id: string;

    @OneToOne(() => UserEntity)
    @JoinTable()
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
