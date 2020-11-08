import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClasseService } from '@classe/classe.service';
import { Auth } from '@/shared/auth';
import { User } from '@user/user.decorator';
import { JwtUser } from '@user/dto';

@ApiTags('classe')
@Controller()
export class ClasseController {
    constructor(
      private readonly classeService: ClasseService
    ) {
    }

    @Auth()
    createClasse(@User() jwtUser: JwtUser) {

    }
}
