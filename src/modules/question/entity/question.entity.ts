import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IQuestionModel } from '@question/dto';
import { UserEntity } from '@user/entity/user.entity';
import { CommentQuestionEntity } from '@comment-question/entity/comment-question.entity';

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
