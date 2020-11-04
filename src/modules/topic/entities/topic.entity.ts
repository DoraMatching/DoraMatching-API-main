import { TrainerEntity } from '@/modules/trainer/entites/trainer.entity';
import { ITopicModel } from '@topic/dto';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('topic')
export class TopicEntity extends BaseEntity implements ITopicModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'text', nullable: false })
    featuredImage: string;

    @OneToOne(() => TrainerEntity)
    author: TrainerEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'text', default: 'topic', nullable: false })
    type: string;
}
