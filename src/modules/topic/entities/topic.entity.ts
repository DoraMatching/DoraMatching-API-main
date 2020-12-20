import { ITopicModel } from '@topic/dto';
import { TrainerEntity } from '@trainer/entities';
import { ClasseEntity } from '@classe/entities';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
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

    @ManyToOne(
        () => TrainerEntity,
        trainer => trainer.topics,
    )
    author: TrainerEntity;

    @OneToMany(
        () => ClasseEntity,
        classe => classe.topic,
    )
    classes: ClasseEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'text', default: 'topic', nullable: false })
    type: string;
}
