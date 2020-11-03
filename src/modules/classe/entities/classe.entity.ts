import { IClasseModel } from '@classe/dto';
import { TopicEntity } from '@topic/entities/topic.entity';
import { TrainerEntity } from '@trainer/entites/trainer.entity';
import { UserEntity } from '@user/entities/user.entity';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('classe')
export class ClasseEntity extends BaseEntity implements IClasseModel{
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

    @ManyToOne(() => TopicEntity, topic => topic.classes)
    @JoinTable()
    topic: TopicEntity;

    @ManyToMany(() => TrainerEntity)
    trainers: TrainerEntity[];

    @ManyToMany(() => UserEntity, user => user.classes)
    members: UserEntity[];

    author: UserEntity;

    createdAt: Date;

    updatedAt: Date;

    type: string;
}
