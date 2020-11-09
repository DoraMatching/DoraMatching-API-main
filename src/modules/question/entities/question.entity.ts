import { CommentQuestionEntity } from '@comment-question/entities';
import { IQuestionModel } from '@question/dto';
import { TagQuestionEntity } from '@tag-question/entities';
import { UserEntity } from '@user/entities';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable, ManyToMany,
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

    @ManyToMany(() => TagQuestionEntity, tag => tag.questions, { cascade: true })
    @JoinTable()
    tags: TagQuestionEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'text', default: 'question', nullable: false })
    type: string;
}
