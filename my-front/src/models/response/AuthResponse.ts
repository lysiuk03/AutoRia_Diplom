import {IUser} from "../IUser.ts";

export interface AuthResponse {
    access_token: string;
    user: IUser;
}