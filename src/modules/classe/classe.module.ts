import { Module } from '@nestjs/common';
import { ClasseController } from '@classe/classe.controller';
import { ClasseService } from '@classe/classe.service';

@Module({
  controllers: [ClasseController],
  providers: [ClasseService]
})
export class ClasseModule {}
