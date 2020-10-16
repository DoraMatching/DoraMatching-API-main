import { AppResources } from '@/app.roles';
import { BaseService } from '@/commons/base-service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDTO } from '@question/dto';
import { QuestionEntity } from '@question/entity/question.entity';
import { QuestionRepository } from '@question/repositories/question.repository';
import { grantPermission } from '@shared/access-control/grant-permission';
import { JwtUser } from '@user/dto';
import { UserRepository } from '@user/repositories/user.repository';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

@Injectable()
export class QuestionService extends BaseService<QuestionEntity, QuestionRepository> {
    constructor(
      private readonly userRepository: UserRepository,
      private readonly questionRepository: QuestionRepository,
      @InjectRolesBuilder()
      private readonly rolesBuilder: RolesBuilder,
    ) {
        super(questionRepository);
    }

    async createQuestion(data: CreateQuestionDTO, jwtUser: JwtUser) {
        const permission = grantPermission(this.rolesBuilder, AppResources.QUESTION, 'create', jwtUser, null);
        if (permission.granted) {
            data = permission.filter(data);
            const user = await this.userRepository.findOne({
                where: { id: jwtUser.id },
                select: ['id', 'name', 'username', 'email'],
            });
            if (!user) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            const newQuestion = this.questionRepository.create({
                ...data,
                author: user,
            });
            try {
                await this.questionRepository.save(newQuestion);
                return newQuestion;
            } catch ({ detail }) {
                throw new HttpException(detail || `OOPS! Can't create question`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }
}
