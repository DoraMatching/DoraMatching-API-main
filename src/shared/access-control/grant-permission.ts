import { AppResources } from '@/app.roles';
import { IJwtUser } from '@user/dto';
import { Permission } from 'accesscontrol';
import { RolesBuilder } from 'nest-access-control';

export type Action = 'read' | 'create' | 'update' | 'delete';

/**
 *
 * @param rolesBuilder
 * @param resource
 * @param action
 * @param param3 Include `id`: string, `roles`: Role[] of `JwtUser`
 * @param creatorId The resource creator
 */
export function grantPermission(
    rolesBuilder: RolesBuilder,
    resource: AppResources,
    action: Action,
    { id, roles }: IJwtUser,
    creatorId: any,
): Permission {
    let behavior;

    if (id && creatorId)
        behavior = `${action}${id === creatorId ? 'Own' : 'Any'}`;
    else behavior = `${action}Any`;

    // let permisson: Permission = rolesBuilder.can(roles).readOwn(resource);

    const permission: Permission = rolesBuilder
        .can(roles)
        [behavior + ''](resource);
    return permission;
}
