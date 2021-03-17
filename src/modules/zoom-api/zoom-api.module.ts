import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repositories';
import { ZoomApiController } from './zoom-api.controller';
import { ZoomApiService } from './zoom-api.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    controllers: [ZoomApiController],
    providers: [ZoomApiService],
})
export class ZoomApiModule {}
