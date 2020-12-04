import { mlApiUrl } from '@/config';
import {
    HttpException,
    HttpService,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { TagPredictAlgorithms, TagPredictionRO } from '@tag-predict/dto';

@Injectable()
export class TagPredictService {
    constructor(private readonly httpService: HttpService) {}

    async predict(content: string, algorithm = TagPredictAlgorithms.TFIDF) {
        try {
            const { data } = await this.httpService
                .post<TagPredictionRO>(
                    `${mlApiUrl}/tags?algorithm=${algorithm}`,
                    {
                        predict: content,
                    },
                )
                .toPromise();
            return data;
        } catch ({ message }) {
            throw new HttpException(
                message || `OOPS! Can't connect to machine learning API server`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
