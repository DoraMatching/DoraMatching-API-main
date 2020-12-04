import { AppResources } from '@/app.roles';
import { BaseService } from '@/commons';
import {
    customPaginate,
    grantPermission,
    IPagination,
    paginateFilter,
    PaginateParams,
} from '@/shared';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ITraineeRO, TraineeRO } from '@trainee/dto';
import { TraineeEntity } from '@trainee/entities';
import { TraineeRepository } from '@trainee/repositories';
import { JwtUser } from '@user/dto';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

@Injectable()
export class TraineeService extends BaseService<
    TraineeEntity,
    TraineeRepository
> {
    private readonly logger: Logger = new Logger(TraineeService.name);

    constructor(
        private readonly traineeRepository: TraineeRepository,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ) {
        super(traineeRepository);
    }

    async getTraineeByUserId(userId: string, jwtUser) {
        const trainee = await this.traineeRepository.getTraineeByUserId(userId);
        if (!trainee)
            throw new HttpException(
                `OOPS! Trainee with id: ${userId} not found!`,
                HttpStatus.NOT_FOUND,
            );
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.TRAINEE,
            'read',
            jwtUser,
            trainee.user.id,
        );
        if (permission.granted) {
            return permission.filter(trainee);
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async getTraineeById(id: string, jwtUser: JwtUser) {
        const trainee = await this.traineeRepository.getTraineeById(id);
        if (!trainee)
            throw new HttpException(
                `OOPS! Trainee with id: ${id} not found!`,
                HttpStatus.NOT_FOUND,
            );
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.TRAINEE,
            'read',
            jwtUser,
            trainee.user.id,
        );
        if (permission.granted) {
            return permission.filter(trainee);
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async getAllTrainees(
        pagOpts: PaginateParams,
        jwtUser: JwtUser,
    ): Promise<IPagination<ITraineeRO>> {
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.TRAINEE,
            'read',
            jwtUser,
            null,
        );
        if (permission.granted) {
            try {
                const data = await this.traineeRepository.getAllTrainees(
                    pagOpts,
                );
                const result = customPaginate<TraineeRO>(data, pagOpts);
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
}
