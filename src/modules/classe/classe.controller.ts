import { Auth } from '@/shared/auth';
import { ClasseService } from '@classe/classe.service';
import { CreateClasseDTO } from '@classe/dto';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';
import { FindOneParams, PaginateParams } from '@/shared';
import { apiUrl } from '@/config';

@ApiTags('classe')
@Controller()
export class ClasseController {
    constructor(
      private readonly classeService: ClasseService,
    ) {
    }

    @Auth()
    @Get('classes')
    getAllClasses(@Query() pagOpts: PaginateParams, @User() jwtUser: JwtUser) {
        return this.classeService.getAllClasses({ ...pagOpts, route: `${apiUrl}/classes` }, jwtUser);
    }

    @Auth()
    @Post('classe')
    createClasse(@Body() data: CreateClasseDTO, @User() jwtUser: JwtUser) {
        return this.classeService.createClasse(data, jwtUser);
    }

    @Auth()
    @Post('classe/:id/register')
    registerClasse(@Param() { id }: FindOneParams, @User() jwtUser: JwtUser) {
        return this.classeService.registerClasse(id, jwtUser);
    }
}
