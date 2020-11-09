import { ClasseController } from '@classe/classe.controller';
import { ClasseService } from '@classe/classe.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@user/repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
    ],
    controllers: [ClasseController],
    providers: [ClasseService],
})
export class ClasseModule {
}
