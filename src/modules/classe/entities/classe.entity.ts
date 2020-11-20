import { IClasseModel } from '@classe/dto';
import { LessonEntity } from '@lesson/entities';
import { TopicEntity } from '@topic/entities';
import { TraineeEntity } from '@trainee/entities';
import { TrainerEntity } from '@trainer/entities';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

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

    @Column({ type: 'timestamptz', nullable: false, default: new Date() })
    startTime: Date;

    @Column({ type: 'timestamptz', nullable: true })
    endTime?: Date;

    @Column({ type: 'integer', nullable: true })
    duration: number;

    @OneToMany(() => LessonEntity, lesson => lesson.classe)
    lessons: LessonEntity[];

    @ManyToOne(() => TopicEntity)
    @JoinColumn({ name: 'topic' })
    topic: TopicEntity;

    @ManyToOne(() => TrainerEntity, trainer => trainer.classes)
    trainer: TrainerEntity;

    @ManyToMany(() => TraineeEntity, trainee => trainee.classes)
    @JoinTable()
    members: TraineeEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'text', nullable: false, default: 'classe' })
    type: string;
}
