import Raccoon from '@maruware/raccoon';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecommenderService {
    private raccoon = new Raccoon({
        className: 'item',
        redisUrl: process.env.REDIS_URL,
        redisPort: Number(process.env.REDIS_PORT)
    });

    async liked(userId: string, itemId: string) {
        return await this.raccoon.liked(userId, itemId);
    }

    async recommendFor(userid: string) {
        return await this.raccoon.recommendFor(userid, 10);
    }
}
