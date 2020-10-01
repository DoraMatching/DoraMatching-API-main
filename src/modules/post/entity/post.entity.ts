import { UserEntity } from '@user/entity/user.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { IPostModel } from '../dto';

@Entity('post')
export class PostEntity extends BaseEntity implements IPostModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    title: string;

    @Column({ type: 'text', nullable: false })
    content: string;

    @Column({ type: 'simple-array', nullable: true })
    tags: string[];

    @ManyToOne(() => UserEntity, author => author.posts, { cascade: true })
    @JoinTable()
    author: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
