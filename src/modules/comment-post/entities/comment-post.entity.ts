import { ICommentPostModel } from '@comment-post/dto';
import { PostEntity } from '@post/entities';
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

@Entity('comment-post')
export class CommentPostEntity extends BaseEntity implements ICommentPostModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @ManyToOne(() => UserEntity, { nullable: false })
  author: UserEntity;

  @ManyToOne(() => PostEntity, { cascade: true, onDelete: 'CASCADE' })
  post: PostEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'text', default: 'comment-post', nullable: false })
  type: string;
}
