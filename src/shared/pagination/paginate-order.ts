import { IPagination } from "./paginate.interface";
import { Order } from "./paginate.params";

function addOrderQuery(links: any, order: Order): any {
    const _links = {};
    Object.keys(links).map(pageName => {
        const pageData = links[pageName];
        _links[pageName] = pageData ? `${pageData}&order=${order}` : '';
    });
    return _links;
}

export function paginateOrder<T>({ items, links, meta }, order: Order): IPagination<T> {
    return {
        items, meta,
        links: addOrderQuery(links, order)
    }
}