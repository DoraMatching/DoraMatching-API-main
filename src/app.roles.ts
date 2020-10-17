import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
    ADMIN = 'ADMIN',
    TRAINER = 'TRAINER',
    TRAINEE = 'TRAINEE',
    GUEST = 'GUEST'
}

export enum AppResources {
    USER = 'USER',
    TOPIC = 'TOPIC',
    POST = 'POST',
    TAG_POST = 'TAG_POST',
    COMMENT_POST = 'COMMENT_POST',
    QUESTION = 'QUESTION'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  // Resource USER
  .grant(AppRoles.GUEST)
  .readAny(AppResources.USER, '*, !email, !roles, !password, !createdAt, !updatedAt')
  .createAny(AppResources.USER, '*, !roles')
  .grant(AppRoles.TRAINEE)
  .readAny(AppResources.USER, '*, !password')
  .updateOwn(AppResources.USER)
  .grant(AppRoles.TRAINER)
  .extend(AppRoles.TRAINEE)
  .grant(AppRoles.ADMIN)
  .createAny(AppResources.USER)
  .readAny(AppResources.USER)
  .updateAny(AppResources.USER)
  .deleteAny(AppResources.USER)

  // Resource POST
  .grant(AppRoles.GUEST)
  .readAny(AppResources.POST)
  .grant(AppRoles.TRAINEE)
  .extend(AppRoles.GUEST)
  .createAny(AppResources.POST)
  .updateOwn(AppResources.POST)
  .deleteOwn(AppResources.POST)
  .grant(AppRoles.TRAINER)
  .extend(AppRoles.TRAINEE)
  .grant(AppRoles.ADMIN)
  .readAny(AppResources.POST)
  .createAny(AppResources.POST)
  .updateAny(AppResources.POST)
  .deleteAny(AppResources.POST)

  // Resource TAG_POST
  .grant(AppRoles.GUEST)
  .readAny(AppResources.TAG_POST)
  .grant(AppRoles.TRAINEE)
  .extend(AppRoles.GUEST)
  .grant(AppRoles.TRAINER)
  .extend(AppRoles.TRAINEE)
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.TRAINER)

  // Resource COMMENT_POST
  .grant(AppRoles.GUEST)
  .readAny(AppResources.COMMENT_POST)
  .grant(AppRoles.TRAINEE)
  .extend(AppRoles.GUEST)
  .createAny(AppResources.COMMENT_POST)
  .updateOwn(AppResources.COMMENT_POST)
  .deleteOwn(AppResources.COMMENT_POST)
  .grant(AppRoles.TRAINER)
  .extend(AppRoles.TRAINEE)
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.TRAINER)
  .deleteAny(AppResources.COMMENT_POST)

  // Resource QUESTION
  .grant(AppRoles.GUEST)
  .readAny(AppResources.QUESTION)
  .grant(AppRoles.TRAINEE)
  .extend(AppRoles.GUEST)
  .createAny(AppResources.QUESTION)
  .updateOwn(AppResources.QUESTION)
  .deleteOwn(AppResources.QUESTION)
  .grant(AppRoles.TRAINER)
  .extend(AppRoles.TRAINEE)
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.TRAINER)
  .deleteAny(AppResources.QUESTION);

