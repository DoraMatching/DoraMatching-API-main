import { Injectable } from '@nestjs/common';
import * as raccoon from 'raccoon';

@Injectable()
export class RecommenderService {
    
    liked(userId: string, itemId: string) {
        raccoon.liked(userId, itemId)
    }
}
