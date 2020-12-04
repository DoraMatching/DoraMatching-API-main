import { ClasseEntity } from '@classe/entities';
import { ITraineeModel } from '@trainee/dto';
import { UserEntity } from '@user/entities';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('trainee')
export class TraineeEntity extends BaseEntity implements ITraineeModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToMany(
        () => ClasseEntity,
        classe => classe.members,
    )
    classes: ClasseEntity[];

    @Column({ type: 'text', nullable: true })
    traineeProfile: string;

    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'user' })
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'text', nullable: false, default: 'trainee' })
    type: string;
}
