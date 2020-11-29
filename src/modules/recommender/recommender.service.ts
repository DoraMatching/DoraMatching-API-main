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

    async unliked(userId: string, itemId: string) {
        return await this.raccoon.unliked(userId, itemId);
    }

    async recommendFor(userid: string) {
        const items = await this.raccoon.recommendFor(userid, 10);
        return items.map(i => JSON.parse(i));
    }
}
