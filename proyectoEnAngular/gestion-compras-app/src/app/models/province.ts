import { Country } from "./country";

export interface Province{
    id: number,
    province: string,
    country: Country,
    createdAt: Date
}
