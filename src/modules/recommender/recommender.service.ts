import AppRecommender from '@/shared/recommender';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecommenderService {
    private recommender = new AppRecommender({
        className: 'item',
        redisUrl: process.env.REDIS_URL,
        redisPort: Number(process.env.REDIS_PORT),
    });

    async liked(userId: string, itemId: string) {
        return await this.recommender.liked(userId, itemId);
    }

    async unliked(userId: string, itemId: string) {
        return await this.recommender.unliked(userId, itemId);
    }

    async recommendFor(userid: string) {
        const items = await this.recommender.recommendFor(userid, 10);
        return items.map(i => JSON.parse(i));
    }
}
