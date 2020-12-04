import { ClasseEntity } from '@classe/entities';
import { ILessonModel } from '@lesson/dto';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('lesson')
export class LessonEntity extends BaseEntity implements ILessonModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(
        () => ClasseEntity,
        classe => classe.lessons,
    )
    classe: ClasseEntity;

    @Column({ type: 'timestamptz', nullable: false, default: new Date() })
    startTime: Date;

    @Column({ type: 'int', nullable: false, default: 60 })
    duration: number;

    @Column({ type: 'text', nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false, default: 'lesson' })
    type: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
