import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
    ADMIN = 'ADMIN',
    TRAINER = 'TRAINER',
    TRAINEE = 'TRAINEE',
    GUEST = 'GUEST',
}

export enum AppResources {
    CLASSE = 'CLASSE',
    COMMENT_POST = 'COMMENT_POST',
    COMMENT_QUESTION = 'COMMENT_QUESTION',
    POST = 'POST',
    QUESTION = 'QUESTION',
    TAG_POST = 'TAG_POST',
    TAG_QUESTION = 'TAG_QUESTION',
    TOPIC = 'TOPIC',
    TRAINER = 'TRAINER',
    TRAINEE = 'TRAINEE',
    USER = 'USER',
    REGISTER_CLASSE_MEMBER = 'REGISTER_CLASSE_MEMBER',
    LESSON = 'LESSON',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
    // Resource USER
    .grant(AppRoles.GUEST)
    .readAny(
        AppResources.USER,
        '*, !email, !phoneNumber, !roles, !password, !createdAt, !updatedAt',
    )
    .createAny(AppResources.USER, '*, !roles')
    .grant(AppRoles.TRAINEE)
    .readAny(AppResources.USER, '*, !password')
    .updateOwn(AppResources.USER, '*, !roles')
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
    .deleteAny(AppResources.QUESTION)

    // Resource COMMENT_QUESTION
    .grant(AppRoles.GUEST)
    .readAny(AppResources.COMMENT_QUESTION)
    .grant(AppRoles.TRAINEE)
    .extend(AppRoles.GUEST)
    .createAny(AppResources.COMMENT_QUESTION)
    .updateOwn(AppResources.COMMENT_QUESTION)
    .deleteOwn(AppResources.COMMENT_QUESTION)
    .grant(AppRoles.TRAINER)
    .extend(AppRoles.TRAINEE)
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.TRAINER)
    .deleteAny(AppResources.COMMENT_QUESTION)

    // Resource TAG_QUESTION
    .grant(AppRoles.GUEST)
    .readAny(AppResources.TAG_QUESTION)
    .grant(AppRoles.TRAINEE)
    .extend(AppRoles.GUEST)
    .grant(AppRoles.TRAINER)
    .extend(AppRoles.TRAINEE)
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.TRAINER)

    // Resource TOPIC
    .grant(AppRoles.GUEST)
    .readAny(AppResources.TOPIC)
    .grant(AppRoles.TRAINEE)
    .extend(AppRoles.GUEST)
    .grant(AppRoles.TRAINER)
    .extend(AppRoles.TRAINEE)
    .createAny(AppResources.TOPIC)
    .updateOwn(AppResources.TOPIC)
    .deleteOwn(AppResources.TOPIC)
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.TRAINER)
    .updateAny(AppResources.TOPIC)
    .deleteAny(AppResources.TOPIC)

    //  Resource CLASSE
    .grant(AppRoles.GUEST)
    .readAny(AppResources.CLASSE, '*')
    .readOwn(AppResources.CLASSE, '*')
    .grant(AppRoles.TRAINEE)
    .extend(AppRoles.GUEST)
    .grant(AppRoles.TRAINER)
    .extend(AppRoles.TRAINEE)
    .createAny(AppResources.CLASSE)
    .updateOwn(AppResources.CLASSE)
    .deleteOwn(AppResources.CLASSE)
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.TRAINER)
    .updateAny(AppResources.CLASSE)
    .deleteAny(AppResources.CLASSE)

    // Resource TRAINER
    .grant(AppRoles.GUEST)
    .readAny(AppResources.TRAINER)
    .grant(AppRoles.TRAINEE)
    .extend(AppRoles.GUEST)
    .createAny(AppResources.TRAINER)
    .grant(AppRoles.TRAINER)
    .extend(AppRoles.TRAINEE)
    .updateOwn(AppResources.TRAINER)
    .deleteOwn(AppResources.TRAINER)
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.TRAINER)
    .updateAny(AppResources.TRAINER)
    .deleteAny(AppResources.TRAINER)

    // Resource REGISTER_CLASSE_MEMBER
    .grant(AppRoles.TRAINEE)
    .createAny(AppResources.REGISTER_CLASSE_MEMBER)

    // Resource TRAINEE
    .grant(AppRoles.GUEST)
    .readAny(AppResources.TRAINEE, '*, !classes')
    .readOwn(AppResources.TRAINEE, '*')
    .grant(AppRoles.TRAINEE)
    .extend(AppRoles.GUEST)
    .updateOwn(AppResources.TRAINEE)
    .grant(AppRoles.TRAINER)
    .extend(AppRoles.TRAINEE)
    .grant(AppRoles.ADMIN)
    .updateAny(AppResources.TRAINEE)
    .deleteAny(AppResources.TRAINEE)

    // Resource LESSON
    .grant(AppRoles.GUEST)
    .readAny(AppResources.LESSON)
    .grant(AppRoles.TRAINEE)
    .extend(AppRoles.GUEST)
    .grant(AppRoles.TRAINER)
    .extend(AppRoles.TRAINEE)
    .createAny(AppResources.LESSON)
    .updateOwn(AppResources.LESSON)
    .deleteOwn(AppResources.LESSON)
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.TRAINER)
    .updateAny(AppResources.LESSON)
    .deleteAny(AppResources.LESSON);
