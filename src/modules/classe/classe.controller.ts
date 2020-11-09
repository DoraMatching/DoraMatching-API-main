import { Auth } from '@/shared/auth';
import { ClasseService } from '@classe/classe.service';
import { CreateClasseDTO } from '@classe/dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtUser } from '@user/dto';
import { User } from '@user/user.decorator';

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
