import { Scalar } from '@nestjs/graphql';
import moment, { Moment } from 'moment';

@Scalar('Date')
export class DateScalar {
    description = 'Date custom scalar type';

    parseValue(value: string): Moment {
        return moment(value);
    }

    serialize(value: Moment): string {
        return value.toISOString();
    }
}