import { ClasseController } from '@classe/classe.controller';
import { ClasseService } from '@classe/classe.service';
import { ClasseRepository } from '@classe/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@user/repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, ClasseRepository]),
    ],
    controllers: [ClasseController],
    providers: [ClasseService],
})
export class ClasseModule {
}
