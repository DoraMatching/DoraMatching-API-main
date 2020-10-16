import { EntityRepository, Repository } from 'typeorm';
import { QuestionEntity } from '@question/entity/question.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(QuestionEntity)
export class QuestionRepository extends Repository<QuestionEntity>{
    private logger: Logger = new Logger(QuestionRepository.name);
}
