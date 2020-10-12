import { AppRoles } from '@/app.roles';
import _ from 'lodash';

const userExcludeRoles = [AppRoles.ADMIN, AppRoles.GUEST];

export function rolesFilter(jwtRoles: AppRoles[], reqRoles: AppRoles[]): AppRoles[] {
    if (jwtRoles.includes(AppRoles.ADMIN)) return reqRoles;
    else return _.pullAll(reqRoles, userExcludeRoles);
}
