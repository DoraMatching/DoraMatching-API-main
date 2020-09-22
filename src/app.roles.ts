import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
    ADMIN   = 'ADMIN',
    TRAINER = 'TRAINER',
    TRAINEE = 'TRAINEE',
    GUEST   = 'GUEST'
}

export enum AppResources {
    USER    = 'USER',
    TOPIC   = 'TOPIC',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
    // Resource USER
    .grant(AppRoles.GUEST)
    .readAny(AppResources.USER, '*, !email, !password')
    .createAny(AppResources.USER)
    .grant(AppRoles.TRAINEE)
    .readAny(AppResources.USER, '*, !password')
    .updateOwn(AppResources.USER)
    .grant(AppRoles.TRAINER)
    .extend(AppRoles.TRAINEE)
    .grant(AppRoles.ADMIN)
    .createAny(AppResources.USER)
    .readAny(AppResources.USER)
    .updateAny(AppResources.USER)
    .deleteAny(AppResources.USER);