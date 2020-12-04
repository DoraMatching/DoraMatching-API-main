import { apiUrl } from '@/config';
import { FindOneParams, IPagination, PaginateParams } from '@/shared';
import { Auth } from '@/shared/auth';
import { ClasseService } from '@classe/classe.service';
import { CreateClasseDTO, IClasseRO } from '@classe/dto';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';

@ApiTags('classe')
@Controller()
export class ClasseController {
    constructor(private readonly classeService: ClasseService) {}

    @Auth()
    @Get('classes')
    getAllClasses(
        @Query() pagOpts: PaginateParams,
        @User() jwtUser: JwtUser,
    ): Promise<IPagination<IClasseRO>> {
        return this.classeService.getAllClasses(
            { ...pagOpts, route: `${apiUrl}/classes` },
            jwtUser,
        );
    }

    @Auth()
    @Post('classe')
    createClasse(
        @Body() data: CreateClasseDTO,
        @User() jwtUser: JwtUser,
    ): Promise<IClasseRO> {
        return this.classeService.createClasse(data, jwtUser);
    }

    @Auth()
    @Get('classe/:id')
    getClasseById(
        @Param() { id }: FindOneParams,
        @User() jwtUser: JwtUser,
    ): Promise<IClasseRO> {
        return this.classeService.getClasseById(id, jwtUser);
    }

    @Auth()
    @Get('classe/:id/register')
    registerClasse(
        @Param() { id }: FindOneParams,
        @User() jwtUser: JwtUser,
    ): Promise<IClasseRO> {
        return this.classeService.registerClasse(id, jwtUser);
    }

    @Auth()
    @Get('classe/:id/deregister')
    deregisterClasse(
        @Param() { id }: FindOneParams,
        @User() jwtUser: JwtUser,
    ): Promise<IClasseRO> {
        return this.classeService.registerClasse(id, jwtUser, true);
    }
}
