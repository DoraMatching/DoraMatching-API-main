import { Module } from '@nestjs/common';
import { ZoomApiService } from './zoom-api.service';

@Module({
    providers: [ZoomApiService],
})
export class ZoomApiModule {}
