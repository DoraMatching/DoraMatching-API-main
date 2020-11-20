import { ApiProperty } from '@nestjs/swagger';
import { IPostRO } from '@post/dto';
import { IQuestionRO } from '@question/dto';
import { IUserRO, UserRO } from '@user/dto';

export type IHomeRO = IPostRO | IQuestionRO | IUserListRO;

export interface IUserListRO {
    users: IUserRO[];
    type: string;
}

export class UserListRO implements IUserListRO {
    constructor(props) {
        this.type = 'user-list';
        Object.assign(this, props);
    }

    @ApiProperty({ type: () => UserRO, isArray: true })
    users: UserRO[];

    @ApiProperty({ type: () => String, default: 'user-list' })
    type: string;
}
