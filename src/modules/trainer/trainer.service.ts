import { AppResources, AppRoles } from '@/app.roles';
import {
    customPaginate,
    grantPermission,
    IPagination,
    paginateFilter,
    PaginateParams,
} from '@/shared';
import { ClasseRO } from '@classe/dto';
import { ClasseRepository } from '@classe/repositories';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrainerDTO, ITrainerRO, TrainerRO } from '@trainer/dto';
import { TrainerRepository } from '@trainer/repositories';
import { IUserModel, JwtUser } from '@user/dto';
import { UserRepository } from '@user/repositories';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

@Injectable()
export class TrainerService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly trainerRepository: TrainerRepository,
        private readonly classeRepository: ClasseRepository,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ) {}

    async getAllClassesByTrainerId(
        pagOpts: PaginateParams,
        trainerId: string,
        jwtUser: JwtUser,
    ) {
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.CLASSE,
            'read',
            jwtUser,
            null,
        );
        if (permission.granted) {
            try {
                const data = await this.classeRepository.getAllClasseByTrainerId(
                    trainerId,
                    pagOpts,
                );
                const result = customPaginate<ClasseRO>(data, pagOpts);
                return paginateFilter(result, permission);
            } catch ({ detail }) {
                throw new HttpException(
                    detail || `OOPS! Can't get all classes by :topicId`,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async getAllTrainers(
        pagOpts: PaginateParams,
        jwtUser: JwtUser,
    ): Promise<IPagination<ITrainerRO>> {
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.POST,
            'read',
            jwtUser,
            null,
        );
        if (permission.granted) {
            try {
                const data = await this.trainerRepository.getAllTrainers(
                    pagOpts,
                );
                const result = customPaginate<TrainerRO>(data, pagOpts);
                return paginateFilter(result, permission);
            } catch ({ detail }) {
                throw new HttpException(
                    detail || 'OOPS!',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async registerTrainer(
        data: CreateTrainerDTO,
        jwtUser: JwtUser,
    ): Promise<TrainerRO> {
        const userId = jwtUser.id;
        const foundUser = await this.userRepository.findOne(userId);
        if (!foundUser)
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.TRAINER,
            'create',
            jwtUser,
            null,
        );
        if (permission.granted) {
            const updateUser: Pick<IUserModel, 'roles'> = {
                roles: [AppRoles.TRAINEE, AppRoles.TRAINER],
            };
            const trainer = this.trainerRepository.create({
                ...data,
                user: foundUser,
            });

            try {
                const [, newTrainer] = await Promise.all([
                    this.userRepository.update(userId, updateUser),
                    this.trainerRepository.save(trainer),
                ]);
                return await this.trainerRepository.getTrainerById(
                    newTrainer.id,
                );
            } catch ({ detail, ...e }) {
                throw new HttpException(
                    detail || `OOPS! Can't register trainer`,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async getTrainerById(id: string, jwtUser: JwtUser): Promise<TrainerRO> {
        const trainer = await this.trainerRepository.getTrainerById(id);
        if (!trainer)
            throw new HttpException(
                `Trainer with id: ${id} not found!`,
                HttpStatus.NOT_FOUND,
            );
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.TRAINER,
            'read',
            jwtUser,
            trainer.user.id,
        );
        if (permission.granted) {
            return permission.filter(trainer);
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async getTrainerByUserId(
        userId: string,
        jwtUser: JwtUser,
    ): Promise<TrainerRO> {
        const [user, trainer] = await Promise.all([
            this.userRepository.getUserById(userId),
            this.trainerRepository.getTrainerByUserId(userId),
        ]);
        if (!user)
            throw new HttpException(
                `Trainer with userId: ${userId} not found!`,
                HttpStatus.NOT_FOUND,
            );
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.TRAINER,
            'read',
            jwtUser,
            trainer.user.id,
        );
        if (permission.granted) {
            return permission.filter(trainer);
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }
}
