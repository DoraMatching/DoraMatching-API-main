import { AppRoles } from '@/app.roles';
import _ from 'lodash';

const userExcludeRoles = [AppRoles.ADMIN, AppRoles.GUEST];

export function rolesFilter(
  jwtRoles: AppRoles[],
  reqRoles: AppRoles[],
): AppRoles[] {
  if (jwtRoles.includes(AppRoles.ADMIN)) return reqRoles;
  else {
    const roles = _.pullAll(reqRoles, userExcludeRoles);
    if (roles.length === 0) return jwtRoles;
    else return roles;
  }
}
