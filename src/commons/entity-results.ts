export interface EntityResults<T> {
    entities: T[],
    count: number,
    totalNestedCount?: number;
    nestedItemsCount?: number;
}
