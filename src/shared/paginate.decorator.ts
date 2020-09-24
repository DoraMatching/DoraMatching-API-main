import { apiUrl } from '@/config';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginateParams } from './pipes.params';

export type PaginateType = Pick<PaginateParams, 'route'>;

export const Paginate = createParamDecorator<PaginateType, ExecutionContext, PaginateParams>(({ route }: PaginateType, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { page, limit, order } = request.query;
    route = `${apiUrl}/${route}`;
    const paginateOptions: PaginateParams = { page: page || 1, limit: limit || 20, order: order || 'DESC', route }
    return paginateOptions;
});