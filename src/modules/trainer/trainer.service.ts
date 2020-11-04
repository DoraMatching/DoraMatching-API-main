import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { UserRepository } from '@user/repositories/user.repository';
import { TrainerRepository } from '@trainer/repository/trainer.repository';
import { JwtUser } from '@user/dto';
import { grantPermission } from '@shared/access-control/grant-permission';
import { AppResources, AppRoles } from '@/app.roles';
import { rolesFilter } from '@shared/access-control/roles-filter';

@Injectable()
export class TrainerService {
    constructor(
      private readonly userRepository: UserRepository,
      private readonly trainerRepository: TrainerRepository,
      @InjectRolesBuilder()
      private readonly rolesBuilder: RolesBuilder,
    ) {
    }

    async registerTrainer(jwtUser: JwtUser) {
        const user = await this.userRepository.getUserById(jwtUser.id);
        if (!user) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        const permission = grantPermission(this.rolesBuilder, AppResources.TRAINER, 'create', jwtUser, null);
        if (permission.granted) {
            const trainer = this.trainerRepository.create({
                user,
            });
            try {
                const [newUser, newTrainer] = await Promise.all([
                    this.userRepository.save(user),
                    this.trainerRepository.save(trainer),
                ]);
                return (await this.userRepository.findOne({ id: jwtUser.id })).toResponseObject(false);
            } catch ({ detail }) {
                throw new HttpException(detail || `OOPS! Can't register trainer`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
