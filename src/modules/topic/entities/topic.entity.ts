import { ITopicModel } from '@topic/dto/topic.model';
import { UserModel } from '@user/dto';
import { UserEntity } from '@user/entities/user.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';


@Entity('topic')
export class TopicEntity extends BaseEntity implements ITopicModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'text', nullable: false })
    featuredImage: string;

    @ManyToOne(() => UserEntity, author => author.topics, { cascade: true, nullable: false })
    @JoinTable()
    author: Partial<UserModel>;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'text', default: 'topic', nullable: false })
    type: string;
}
