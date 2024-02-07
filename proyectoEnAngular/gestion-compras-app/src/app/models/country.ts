import { Province } from "./province";

export interface Country{
    id: number,
    country: string,
    createdAt: Date,
    provinces: Array<Province>
}