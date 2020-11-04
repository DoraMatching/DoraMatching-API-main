import { IClasseModel } from '@classe/dto';
import { TopicModel } from '@topic/dto';
import { ITrainerModel } from '@trainer/dto';
import { UserModel } from '@user/dto';
import { UserEntity } from '@user/entities';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('classe')
export class ClasseEntity extends BaseEntity implements IClasseModel{
    topic: Partial<TopicModel>;
    trainers: ITrainerModel[];
    members: UserModel[];
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'text', nullable: false })
    featuredImage: string;

    @Column({ type: 'timestamp', nullable: false, default: new Date() })
    startTime: Date;

    @Column({ type: 'timestamp', nullable: false })
    endTime?: Date;

    @Column({ type: 'integer', nullable: false })
    duration: number;

    author: UserEntity;

    createdAt: Date;

    updatedAt: Date;

    type: string;
}
