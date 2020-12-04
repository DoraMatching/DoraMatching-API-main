import { ICommentQuestionModel } from '@comment-question/dto';
import { QuestionEntity } from '@question/entities';
import { UserEntity } from '@user/entities';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('comment-question')
export class CommentQuestionEntity extends BaseEntity
    implements ICommentQuestionModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    content: string;

    @ManyToOne(() => UserEntity, { nullable: false })
    author: UserEntity;

    @ManyToOne(() => QuestionEntity, { cascade: true, onDelete: 'CASCADE' })
    question: QuestionEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'text', default: 'comment-question', nullable: false })
    type: string;
}
