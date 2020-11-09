import { EntityRepository, Repository } from 'typeorm';
import { ClasseEntity } from '@classe/entities';

@EntityRepository(ClasseEntity)
export class ClasseRepository extends Repository<ClasseEntity>{

}
