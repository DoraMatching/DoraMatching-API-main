import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { TraineeEntity } from '@trainee/entities';
import { TraineeRepository } from '@trainee/repositories';
import { BaseService } from '@/commons';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { customPaginate, grantPermission, IPagination, paginateFilter, PaginateParams } from '@/shared';
import { JwtUser } from '@user/dto';
import { ITraineeRO, TraineeRO } from '@trainee/dto';
import { AppResources } from '@/app.roles';

@Injectable()
export class TraineeService extends BaseService<TraineeEntity, TraineeRepository> {
    private readonly logger: Logger = new Logger(TraineeService.name);

    constructor(
      private readonly traineeRepository: TraineeRepository,
      @InjectRolesBuilder()
      private readonly rolesBuilder: RolesBuilder,
    ) {
        super(traineeRepository);
    }

    async getAllTrainees(pagOpts: PaginateParams, jwtUser: JwtUser): Promise<IPagination<ITraineeRO>> {
        const permission = grantPermission(this.rolesBuilder, AppResources.TRAINEE, 'read', jwtUser, null);
        if (permission.granted) {
            try {
                const data = await this.traineeRepository.getAllTrainees(pagOpts);
                const result = customPaginate<TraineeRO>(data, pagOpts);
                return paginateFilter(result, permission);
            }catch ({ detail }) {
                throw new HttpException(detail || 'OOPS!', HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }
}
