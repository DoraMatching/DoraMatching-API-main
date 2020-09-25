import { UserModel } from "./user.model";

export type IJwtUser = Pick<UserModel, 'id' | 'username' | 'roles' | 'email'>

export class JwtUser implements IJwtUser {
    id: string;
    username: string;
    roles: string[];
    email: string;
}