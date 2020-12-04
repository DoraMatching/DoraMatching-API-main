export interface ConfigArgs {
    nearestNeighbors?: number;
    className?: string;
    numOfRecsStore?: number;
    factorLeastSimilarLeastLiked?: boolean;
    redisUrl?: string;
    redisPort?: number;
    redisAuth?: string;
}

export default class Config {
    nearestNeighbors: number;
    className: string;
    numOfRecsStore: number;
    factorLeastSimilarLeastLiked: boolean;
    redisUrl: string;
    redisPort: number;
    redisAuth: string;

    constructor({
        nearestNeighbors,
        className,
        numOfRecsStore,
        factorLeastSimilarLeastLiked,
        redisUrl,
        redisPort,
        redisAuth,
    }: ConfigArgs) {
        this.nearestNeighbors = nearestNeighbors || 5;
        this.className = className || 'item';
        this.numOfRecsStore = numOfRecsStore || 30;
        this.factorLeastSimilarLeastLiked =
            factorLeastSimilarLeastLiked || false;
        this.redisUrl = redisUrl || process.env.REDIS_URL || '127.0.0.1';
        this.redisPort =
            redisPort ||
            (process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379);
        this.redisAuth = redisAuth || process.env.REDIS_AUTH || '';
    }
}
