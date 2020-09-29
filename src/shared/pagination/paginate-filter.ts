import { Permission } from 'accesscontrol';
import { IPagination } from './paginate.interface';

export function paginateFilter<T>({ items, links, meta }: IPagination<T>, permission?: Permission): IPagination<T> {
    const _items = permission?.filter(items) || items;
    return {
        items: _items,
        meta, links
    };
}