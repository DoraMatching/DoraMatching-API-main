import { HttpModule, Module } from '@nestjs/common';
import { TagPredictController } from './tag-predict.controller';
import { TagPredictService } from './tag-predict.service';

@Module({
    imports: [HttpModule],
    controllers: [TagPredictController],
    providers: [TagPredictService],
})
export class TagPredictModule {}
