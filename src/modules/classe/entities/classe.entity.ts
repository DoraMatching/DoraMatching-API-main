import { IClasseModel } from '@classe/dto';
import { TopicEntity } from '@topic/entities';
import { TrainerEntity } from '@trainer/entities';
import { UserModel } from '@user/dto';
import { UserEntity } from '@user/entities';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('classe')
export class ClasseEntity extends BaseEntity implements IClasseModel {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'text', nullable: false })
    featuredImage: string;

    @Column({ type: 'timestamp', nullable: false, default: new Date() })
    startTime: Date;

    @Column({ type: 'timestamp', nullable: false })
    endTime?: Date;

    @Column({ type: 'integer', nullable: false })
    duration: number;

    @ManyToOne(() => TopicEntity)
    @JoinColumn({ name: 'topic' })
    topic: TopicEntity;

    @ManyToOne(() => TrainerEntity, trainer => trainer.classes)
    trainer: TrainerEntity;

    members: UserModel[];

    author: UserEntity;

    createdAt: Date;

    updatedAt: Date;

    type: string;
}
