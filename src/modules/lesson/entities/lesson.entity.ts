import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ILessonModel } from '@lesson/dto';
import { ClasseEntity } from '@classe/entities';

@Entity('lesson')
export class LessonEntity extends BaseEntity implements ILessonModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ClasseEntity, classe => classe.lessons)
    classe: ClasseEntity;

    @Column({ type: 'timestamp', nullable: false, default: new Date() })
    timeStart: Date;

    @Column({ type: 'int', nullable: false, default: 60 })
    duration: number;

    @Column({ type: 'text', nullable: false })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
