import { Injectable, Logger } from '@nestjs/common';
import { ClasseEntity } from '@classe/entities';
import { ClasseRepository } from '@classe/repositories';
import { BaseService } from '@/commons';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { CreateClasseDTO } from '@classe/dto';
import { JwtUser } from '@user/dto';
import { grantPermission } from '@/shared';
import { AppResources } from '@/app.roles';

@Injectable()
export class ClasseService extends BaseService<ClasseEntity, ClasseRepository> {
    private readonly logger: Logger = new Logger(ClasseService.name);

    constructor(
      private readonly classeRepository: ClasseRepository,
      @InjectRolesBuilder()
      private readonly rolesBuilder: RolesBuilder,
    ) {
        super(classeRepository);
    }

    async createClasse(data: CreateClasseDTO, jwtUser: JwtUser) {
        const permission = grantPermission(this.rolesBuilder, AppResources.CLASSE, 'create', jwtUser, null);
        if(permission.granted) {
            // const []
        }
    }
}
