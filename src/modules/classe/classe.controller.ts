import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClasseService } from '@classe/classe.service';
import { Auth } from '@/shared/auth';
import { User } from '@user/user.decorator';
import { JwtUser } from '@user/dto';
import { CreateClasseDTO } from '@classe/dto';

@ApiTags('classe')
@Controller()
export class ClasseController {
    constructor(
      private readonly classeService: ClasseService,
    ) {
    }

    @Auth()
    @Post('classe')
    createClasse(@Body() data: CreateClasseDTO, @User() jwtUser: JwtUser) {
        console.log(data);
        return this.classeService.createClasse(data, jwtUser);
    }
}
