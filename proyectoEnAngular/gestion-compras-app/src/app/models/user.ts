import { DatesInfo } from "./dates-info";

export interface User{
    userName: string,
    password: string,
    createdAt: Date,
    deletedAt: Date | null
}