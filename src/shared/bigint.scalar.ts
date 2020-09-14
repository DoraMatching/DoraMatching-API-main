import { Scalar } from '@nestjs/graphql';

@Scalar('BigInt')
export class BigIntScalar {
    description = 'BigInt custom scalar type';

    parseValue(value: number): number {
        return Number(value);
    }

    serialize(value: number): any {
        return value;
    }
}