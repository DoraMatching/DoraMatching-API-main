import {
    ITagPredictionRO,
    RequestTagPredictDTO,
    RequestTagQueryDTO,
    TagPredictionRO,
} from '@/modules/tag-predict/dto';
import { TagPredictService } from '@/modules/tag-predict/tag-predict.service';
import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('machine-learning-features')
@Controller('tag-predict')
export class TagPredictController {
    constructor(private readonly tagPredictService: TagPredictService) {}

    @Post()
    @ApiOperation({
        summary: 'Predict the tags',
        description: 'Return an array of tags',
    })
    @ApiResponse({ type: [TagPredictionRO], status: 200 })
    predict(
        @Query() { algorithm }: RequestTagQueryDTO,
        @Body() { predict }: RequestTagPredictDTO,
    ): Promise<ITagPredictionRO> {
        return this.tagPredictService.predict(predict, algorithm);
    }
}
