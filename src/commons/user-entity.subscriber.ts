import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { UserEntity } from "../modules/user/entity/user.entity";
import * as bcrypt from 'bcryptjs';
import { AvatarGenerator } from "random-avatar-generator";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
    listenTo() {
        return UserEntity;
    }

    async beforeInsert(event: InsertEvent<UserEntity>): Promise<void> {
        const { password, username, name, email, avatarUrl } = event.entity

        if (password) {
            event.entity.password = await bcrypt.hash(password, 10);
        }

        if (name) {
            event.entity.name = username || email;
        }

        if (avatarUrl) {
            const generator = new AvatarGenerator();
            generator.generateRandomAvatar();
            event.entity.avatarUrl = avatarUrl || generator.generateRandomAvatar(username);
        }
    }
}