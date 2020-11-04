import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { ITagQuestionModel } from '@tag-question/dto';
import { QuestionEntity } from '@question/entities';

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
