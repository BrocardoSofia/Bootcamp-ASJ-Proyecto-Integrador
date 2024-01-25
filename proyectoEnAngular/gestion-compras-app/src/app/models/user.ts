import { DatesInfo } from "./dates-info";

export interface User{
    id: number,
    userName: string,
    password: string,
    createdAt: Date,
    deletedAt: Date | null
}