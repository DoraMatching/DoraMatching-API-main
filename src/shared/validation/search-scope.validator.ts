import { SearchScopes } from '@search/search.query';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import _ from 'lodash';

export const scopeArray = Object.values(SearchScopes);

@ValidatorConstraint({ name: 'searchScopeCheck', async: false })
export class SearchScopeValidator implements ValidatorConstraintInterface {
    validate(scope: SearchScopes[]) {
        return _.difference(scope, scopeArray).length === 0;
    }

    defaultMessage() {
        return `Search scopes must be one of the following values: ${Object.keys(
            SearchScopes,
        ).join(', ')}`;
    }
}
