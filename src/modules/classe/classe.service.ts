import { AppResources } from '@/app.roles';
import { BaseService } from '@/commons';
import { grantPermission } from '@/shared';
import { ClasseModel, CreateClasseDTO } from '@classe/dto';
import { ClasseEntity } from '@classe/entities';
import { ClasseRepository } from '@classe/repositories';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtUser } from '@user/dto';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { TrainerRepository } from '@trainer/repositories';
import { TopicRepository } from '@topic/repositories';
import moment from 'moment';

@Injectable()
export class ClasseService extends BaseService<ClasseEntity, ClasseRepository> {
    private readonly logger: Logger = new Logger(ClasseService.name);

    constructor(
      private readonly classeRepository: ClasseRepository,
      private readonly trainerRepository: TrainerRepository,
      private readonly topicRepository: TopicRepository,
      @InjectRolesBuilder()
      private readonly rolesBuilder: RolesBuilder,
    ) {
        super(classeRepository);
    }

    classeValidate(classe: Partial<ClasseModel>): void {
        const [startTime, endTime] = [moment(classe.startTime), moment(classe.endTime)];
        if (endTime.isBefore(startTime)) throw new HttpException(`OOPS! Invalid startTime or endTime`, HttpStatus.BAD_REQUEST);
    }

    async createClasse(data: CreateClasseDTO, jwtUser: JwtUser) {
        const permission = grantPermission(this.rolesBuilder, AppResources.CLASSE, 'create', jwtUser, null);
        if (permission.granted) {
            const [trainer, topic] = await Promise.all([
                this.trainerRepository.getTrainerByUserId(jwtUser.id),
                this.topicRepository.getTopicById(data.topic.id),
            ]);

            if (!trainer) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            if (!topic) throw new HttpException(`OOPS! Topic with id: ${data.topic.id} not found!`, HttpStatus.NOT_FOUND);

            this.classeValidate(data);

            data = permission.filter(data);
            const newClasse = this.classeRepository.create({
                ...data,
                trainer,
                topic,
            });

            try {
                const _classe = await this.classeRepository.save(newClasse);
                return await this.classeRepository.getClasseById(_classe.id);
            } catch ({ detail }) {
                throw new HttpException(detail || `OOPS! Can't create classe`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }
}
