import { apiUrl, pLimit, pOrder } from '@/config';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginateParams } from './paginate.params';

export type PaginateType = Pick<PaginateParams, 'route'>;

export const Paginate = createParamDecorator<PaginateType, ExecutionContext, PaginateParams>(({ route }: PaginateType, ctx: ExecutionContext): PaginateParams => {
    const request = ctx.switchToHttp().getRequest();
    const { page, limit, order } = request.query;
    route = `${apiUrl}/${route}`;
    const paginateOptions: PaginateParams = { page: page || 1, limit: limit || pLimit, order: order || pOrder, route }
    return paginateOptions;
});