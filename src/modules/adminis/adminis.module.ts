import { Module } from '@nestjs/common';
import { AdminisController } from './adminis.controller';
import { AdminisService } from './adminis.service';

@Module({
    controllers: [AdminisController],
    providers: [AdminisService],
})
export class AdminisModule {}
