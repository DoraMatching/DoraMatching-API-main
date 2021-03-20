import { RolesBuilder } from 'nest-access-control';
import { AppResources } from '@/app.roles';
import { Action, AppPermission } from '@/shared';
import { IJwtUser } from '@user/dto';

export class AppPermissionBuilder {
    private rolesBuilder: RolesBuilder;
    private resourceName: AppResources;
    private action: Action;
    private jwtUser: IJwtUser;
    private creatorId: string;

    setRolesBuilder(rolesBuilder: RolesBuilder): AppPermissionBuilder {
        this.rolesBuilder = rolesBuilder;
        return this;
    }

    setResourceName(resourceName: AppResources): AppPermissionBuilder {
        this.resourceName = resourceName;
        return this;
    }

    setAction(action: Action): AppPermissionBuilder {
        this.action = action;
        return this;
    }

    setRequestUser(jwtUser: IJwtUser): AppPermissionBuilder {
        this.jwtUser = jwtUser;
        return this;
    }

    setCreatorId(creatorId: string): AppPermissionBuilder {
        this.creatorId = creatorId;
        return this;
    }

    build(): AppPermission {
        if (!this.rolesBuilder) throw new Error('No roles builder');
        if (!this.resourceName) throw new Error('No resource name');
        if (!this.action) throw new Error('No action');
        if (!this.jwtUser) throw new Error('No request user');
        return new AppPermission(
            this.rolesBuilder,
            this.resourceName,
            this.action,
            this.jwtUser,
            this.creatorId,
        );
    }
}
