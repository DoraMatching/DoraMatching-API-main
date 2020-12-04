import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function PaginateSwagger() {
    return applyDecorators(
        ApiQuery({ name: 'page', type: 'number' }),
        ApiQuery({ name: 'limit', type: 'number' }),
        ApiQuery({ name: 'order', type: 'array', enum: ['ASC', 'DESC'] }),
    );
}
