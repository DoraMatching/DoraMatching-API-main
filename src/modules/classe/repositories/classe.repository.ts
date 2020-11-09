import { ClasseEntity } from '@classe/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ClasseEntity)
export class ClasseRepository extends Repository<ClasseEntity>{

}
