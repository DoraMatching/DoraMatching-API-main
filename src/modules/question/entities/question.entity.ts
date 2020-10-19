import { CommentQuestionEntity } from '@/modules/comment-question/entities/comment-question.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { IQuestionModel } from '@question/dto';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('question')
export class QuestionEntity extends BaseEntity implements IQuestionModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    title: string;

    @Column({ type: 'text', nullable: false })
    content: string;

    @ManyToOne(() => UserEntity, author => author.posts, { cascade: true, nullable: false })
    @JoinTable()
    author: UserEntity;

    @OneToMany(() => CommentQuestionEntity, comment => comment.question)
    @JoinTable()
    comments: CommentQuestionEntity[];

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}
