const USER = 'user';
const ITEM = 'item';

function joinKey(className: string, keyArr: string[]) {
    return [className].concat(keyArr).join(':');
}

export function userLikedSetKey(className: string, userId: string) {
    return joinKey(className, [USER, userId, 'liked']);
}

export function userDislikedSetKey(className: string, userId: string) {
    return joinKey(className, [USER, userId, 'disliked']);
}

export function itemLikedBySetKey(className: string, itemId: string) {
    return joinKey(className, [ITEM, itemId, 'liked']);
}

export function itemDislikedBySetKey(className: string, itemId: string) {
    return joinKey(className, [ITEM, itemId, 'disliked']);
}

export function mostLikedKey(className: string) {
    return joinKey(className, ['mostLiked']);
}

export function mostDislikedKey(className: string) {
    return joinKey(className, ['mostDisliked']);
}

export function recommendedZSetKey(className: string, userId: string) {
    return joinKey(className, [USER, userId, 'recommendedZSet']);
}

export function scoreboardZSetKey(className: string) {
    return joinKey(className, ['scoreboard']);
}

export function similarityZSetKey(className: string, userId: string) {
    return joinKey(className, [USER, userId, 'similarityZSet']);
}

export function tempAllLikedSetKey(className: string, userId: string) {
    return joinKey(className, [USER, userId, 'tempAllLikedSet']);
}
