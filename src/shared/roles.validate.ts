import _ from 'lodash';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { AppRoles } from '@/app.roles';

export const rolesArray = Object.keys(AppRoles);

@ValidatorConstraint({ name: 'roleCheck', async: false })
export class RolesValidator implements ValidatorConstraintInterface {
    validate(roles: string[]) {
        return _.difference(roles, rolesArray).length === 0;
    }

    defaultMessage() {
        return `roles must be one of the following values: ${rolesArray.join(', ')}`;
    }
}