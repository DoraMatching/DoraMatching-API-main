import { ITrainerModel } from '@trainer/dto';
import { UserEntity } from '@user/entities/user.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('trainer')
export class TrainerEntity extends BaseEntity implements ITrainerModel{
    @PrimaryGeneratedColumn()
    id: string;

    @OneToOne(() => UserEntity)
    userEntity: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column({ type: 'text', nullable: false, default: 'trainer' })
    type: string;
}
