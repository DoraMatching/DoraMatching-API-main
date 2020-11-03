import { QuestionEntity } from '@question/entities/question.entity';
import { ITagQuestionModel } from '@tag-question/dto';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('tag-question')
export class TagQuestionEntity extends BaseEntity implements ITagQuestionModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    name: string;

    @ManyToMany(() => QuestionEntity, question => question.tags)
    questions: QuestionEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'text', default: 'tag-question', nullable: false })
    type: string;
}
