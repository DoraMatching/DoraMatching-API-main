import { Auth } from '@/shared';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@user/user.decorator';
import { RecommenderService } from './recommender.service';

@ApiTags('machine-learning-features')
@Controller('recommender')
export class RecommenderController {
    constructor(private readonly recommenderService: RecommenderService) {}

    @Get('liked')
    liked(@Query('userId') userId: string, @Query('itemId') itemId: string) {
        return this.recommenderService.liked(userId, itemId);
    }

    @Get('for')
    recommendFor(@Query('userId') userId: string) {
        return this.recommenderService.recommendFor(userId);
    }

    @Auth()
    @Get('my')
    async myRecommends(@User() { id: userId }) {
        return this.recommenderService.recommendFor(userId);
    }
}
