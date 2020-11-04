import { TrainerRepository } from '@trainer/repositories';
import { AppResources, AppRoles } from '@/app.roles';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { customPaginate, grantPermission, IPagination, paginateFilter, PaginateParams } from '@/shared';
import { CreateTrainerDTO, ITrainerRO, TrainerRO } from '@trainer/dto';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { UserRepository } from '@user/repositories';
import { IUserModel, JwtUser } from '@user/dto';

@Injectable()
export class TrainerService {
    constructor(
      private readonly userRepository: UserRepository,
      private readonly trainerRepository: TrainerRepository,
      @InjectRolesBuilder()
      private readonly rolesBuilder: RolesBuilder,
    ) {
    }

    async getAllTrainers(pagOpts: PaginateParams, jwtUser: JwtUser): Promise<IPagination<ITrainerRO>> {
        const permission = grantPermission(this.rolesBuilder, AppResources.POST, 'read', jwtUser, null);
        if (permission.granted) {
            try {
                const data = await this.trainerRepository.getAllTrainers(pagOpts);
                const result = customPaginate<TrainerRO>(data, pagOpts);
                return paginateFilter(result, permission);
            } catch ({ detail }) {
                throw new HttpException(detail || 'OOPS!', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    async registerTrainer(data: CreateTrainerDTO, jwtUser: JwtUser): Promise<TrainerRO> {
        const userId = jwtUser.id;
        const foundUser = await this.userRepository.findOne(userId);
        if (!foundUser) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        const permission = grantPermission(this.rolesBuilder, AppResources.TRAINER, 'create', jwtUser, null);
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
                return (await this.trainerRepository.getTrainerById(newTrainer.id));
            } catch ({ detail, ...e }) {
                throw new HttpException(detail || `OOPS! Can't register trainer`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
