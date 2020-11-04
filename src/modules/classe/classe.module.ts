import { ClasseController } from '@classe/classe.controller';
import { ClasseService } from '@classe/classe.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ClasseController],
  providers: [ClasseService]
})
export class ClasseModule {}
