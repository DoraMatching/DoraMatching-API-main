import { CommentPostEntity } from '@comment-post/entities';
import { IPostModel } from '@post/dto';
import { TagPostEntity } from '@tag-post/entities';
import { UserEntity } from '@user/entities';
import {
    BaseEntity,
    Column, CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';

@Entity('post')
export class PostEntity extends BaseEntity implements IPostModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true })
    subTitle: string;

    @Column({ type: 'text', nullable: true })
    featuredImage: string;

    @Column({ type: 'boolean', nullable: false })
    isDraft: boolean;

    @Column({ type: 'text', nullable: false })
    content: string;

    @ManyToMany(() => TagPostEntity, tag => tag.posts, {
        cascade: ['insert', 'update', 'remove'],
        eager: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinTable()
    tags: TagPostEntity[];

    @ManyToOne(() => UserEntity, author => author.posts, { cascade: true, nullable: false })
    @JoinTable()
    author: UserEntity;

    @OneToMany(() => CommentPostEntity, comment => comment.post)
    @JoinTable()
    comments: CommentPostEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'text', default: 'post', nullable: false })
    type: string;
}
