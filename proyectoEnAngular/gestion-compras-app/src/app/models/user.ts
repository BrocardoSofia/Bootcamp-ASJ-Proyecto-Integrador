import { DatesInfo } from "./dates-info";

export interface User{
    id: number,
    userName: string,
    password: string,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
}