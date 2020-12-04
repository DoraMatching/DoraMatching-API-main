import Redis from 'ioredis';

export const createClient = (
    redisPort: number,
    redisUrl: string,
    redisAuth?: string,
) => {
    const client = new Redis(redisPort, redisUrl);
    if (redisAuth) {
        client.auth(redisAuth, function(err) {
            if (err) {
                throw err;
            }
        });
    }
    return client;
};
