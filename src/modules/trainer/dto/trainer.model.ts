import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "@user/dto";

export interface ITrainerModel {
    userEntity: Partial<UserModel>;
}

export class TrainerModel implements ITrainerModel{
    @ApiProperty()
    userEntity: UserModel;
}
