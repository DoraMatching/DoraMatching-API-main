import { Controller, Get, Query } from '@nestjs/common';
import { RecommenderService } from './recommender.service';

@Controller('recommender')
export class RecommenderController {
    constructor(
        private readonly recommenderService: RecommenderService
    ) { }

    @Get('liked')
    liked(@Query('userId') userId: string, @Query('itemId') itemId: string) {
        return this.recommenderService.liked(userId, itemId);
    }

    @Get('for')
    recommendFor(@Query('userId') userId: string) {
        return this.recommenderService.recommendFor(userId);
    }
}
