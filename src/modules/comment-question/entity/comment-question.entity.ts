import { ICommentQuestionModel } from '@comment-question/dto';
import { QuestionEntity } from '@question/entity/question.entity';
import { UserEntity } from '@user/entity/user.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('comment-question')
export class CommentQuestionEntity extends BaseEntity implements ICommentQuestionModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    content: string;

    @ManyToOne(() => UserEntity, { nullable: false })
    author: UserEntity;

    @ManyToOne(() => QuestionEntity)
    question: QuestionEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}