import { ClasseController } from '@classe/classe.controller';
import { ClasseService } from '@classe/classe.service';
import { ClasseRepository } from '@classe/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@user/repositories';
import { TrainerRepository } from '@trainer/repositories';
import { TopicRepository } from '@topic/repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, ClasseRepository, TrainerRepository, TopicRepository]),
    ],
    controllers: [ClasseController],
    providers: [ClasseService],
})
export class ClasseModule {
}
