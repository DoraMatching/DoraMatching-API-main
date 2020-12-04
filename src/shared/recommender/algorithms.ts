import pMap from 'p-map';
import {
    userLikedSetKey,
    userDislikedSetKey,
    similarityZSetKey,
    itemLikedBySetKey,
    itemDislikedBySetKey,
    tempAllLikedSetKey,
    recommendedZSetKey,
    scoreboardZSetKey,
} from './key';
import { Redis } from 'ioredis';

const jaccardCoefficient = async function(
    client: Redis,
    className: string,
    userId1: string,
    userId2: string,
) {
    const user1LikedSet = userLikedSetKey(className, userId1);
    const user1DislikedSet = userDislikedSetKey(className, userId1);
    const user2LikedSet = userLikedSetKey(className, userId2);
    const user2DislikedSet = userDislikedSetKey(className, userId2);

    const results1 = await client.sinter(user1LikedSet, user2LikedSet);
    const results2 = await client.sinter(user1DislikedSet, user2DislikedSet);
    const results3 = await client.sinter(user1LikedSet, user2DislikedSet);
    const results4 = await client.sinter(user1DislikedSet, user2LikedSet);

    const similarity =
        results1.length + results2.length - results3.length - results4.length;
    const ratedInCommon =
        results1.length + results2.length + results3.length + results4.length;
    const finalJaccardScore: number = similarity / ratedInCommon;
    return finalJaccardScore;
};

export const updateSimilarityFor = async function(
    client: Redis,
    className: string,
    userId: string,
) {
    let itemLikeDislikeKeys: string[] = [];
    const similarityZSet = similarityZSetKey(className, userId);
    const userRatedItemIds = await client.sunion(
        userLikedSetKey(className, userId),
        userDislikedSetKey(className, userId),
    );
    if (userRatedItemIds.length > 0) {
        itemLikeDislikeKeys = userRatedItemIds
            .map(function(itemId) {
                const itemLiked = itemLikedBySetKey(className, itemId);
                const itemDisliked = itemDislikedBySetKey(className, itemId);
                return [itemLiked, itemDisliked];
            })
            .flat();
    }
    const otherUserIdsWhoRated = await client.sunion(...itemLikeDislikeKeys);

    await pMap(otherUserIdsWhoRated, async (otherUserId: string) => {
        if (otherUserIdsWhoRated.length === 1 || userId === otherUserId) {
            return;
        }
        if (userId !== otherUserId) {
            const result = await jaccardCoefficient(
                client,
                className,
                userId,
                otherUserId,
            );
            await client.zadd(similarityZSet, result.toString(), otherUserId);
        }
    });
};

export const similaritySum = async function(
    client: Redis,
    simSet: string,
    compSet: string,
) {
    let similarSum = 0.0;
    const userIds = await client.smembers(compSet);
    await pMap(
        userIds,
        async userId => {
            const zScore = await client.zscore(simSet, userId);
            const newScore = parseFloat(zScore) || 0.0;
            similarSum += newScore;
        },
        { concurrency: 1 },
    );

    return similarSum;
};

export const predictFor = async function(
    client: Redis,
    className: string,
    userId: string,
    itemId: string,
) {
    let finalSimilaritySum = 0.0;
    const similarityZSet = similarityZSetKey(className, userId);
    const likedBySet = itemLikedBySetKey(className, itemId);
    const dislikedBySet = itemDislikedBySetKey(className, itemId);

    const result1 = await similaritySum(client, similarityZSet, likedBySet);
    const result2 = await similaritySum(client, similarityZSet, dislikedBySet);
    finalSimilaritySum = result1 - result2;
    const likedByCount = await client.scard(likedBySet);
    const dislikedByCount = await client.scard(dislikedBySet);

    const prediction = finalSimilaritySum / (likedByCount + dislikedByCount);
    if (isFinite(prediction)) {
        return prediction;
    } else {
        return 0.0;
    }
};

export const updateRecommendationsFor = async function(
    client: Redis,
    className: string,
    nearestNeighbors: number,
    numOfRecsStore: number,
    userId: string,
) {
    const setsToUnion: string[] = [];
    const scoreMap: [number, string][] = [];
    const tempAllLikedSet = tempAllLikedSetKey(className, userId);
    const similarityZSet = similarityZSetKey(className, userId);
    const recommendedZSet = recommendedZSetKey(className, userId);

    const mostSimilarUserIds = await client.zrevrange(
        similarityZSet,
        0,
        nearestNeighbors - 1,
    );
    const leastSimilarUserIds = await client.zrange(
        similarityZSet,
        0,
        nearestNeighbors - 1,
    );
    mostSimilarUserIds.forEach(function(usrId) {
        setsToUnion.push(userLikedSetKey(className, usrId));
    });
    leastSimilarUserIds.forEach(function(usrId) {
        setsToUnion.push(userDislikedSetKey(className, usrId));
    });
    if (setsToUnion.length > 0) {
        await client.sunionstore(tempAllLikedSet, ...setsToUnion);
        const notYetRatedItems = await client.sdiff(
            tempAllLikedSet,
            userLikedSetKey(className, userId),
            userDislikedSetKey(className, userId),
        );

        await pMap(
            notYetRatedItems,
            async function(itemId: string) {
                const score = await predictFor(
                    client,
                    className,
                    userId,
                    itemId,
                );
                scoreMap.push([score, itemId]);
            },
            { concurrency: 1 },
        );

        await client.del(recommendedZSet);

        await pMap(
            scoreMap,
            async function(scorePair) {
                await client.zadd(
                    recommendedZSet,
                    scorePair[0].toString(),
                    scorePair[1],
                );
            },
            { concurrency: 1 },
        );

        await client.del(tempAllLikedSet);
        const length = await client.zcard(recommendedZSet);
        await client.zremrangebyrank(
            recommendedZSet,
            0,
            length - numOfRecsStore - 1,
        );
    }
};

export const updateWilsonScore = async function(
    client: Redis,
    className: string,
    itemId: string,
) {
    const scoreboard = scoreboardZSetKey(className);
    const likedBySet = itemLikedBySetKey(className, itemId);
    const dislikedBySet = itemDislikedBySetKey(className, itemId);
    const z = 1.96;
    let n, pOS, score;

    const likedResults = await client.scard(likedBySet);
    const dislikedResults = await client.scard(dislikedBySet);

    if (likedResults + dislikedResults > 0) {
        n = likedResults + dislikedResults;
        pOS = likedResults / n;
        try {
            score =
                (pOS +
                    (z * z) / (2 * n) -
                    z * Math.sqrt((pOS * (1 - pOS) + (z * z) / (4 * n)) / n)) /
                (1 + (z * z) / n);
        } catch (e) {
            console.log(e.name + ': ' + e.message);
            score = 0.0;
        }
        await client.zadd(scoreboard, score.toString(), itemId);
    }
};
