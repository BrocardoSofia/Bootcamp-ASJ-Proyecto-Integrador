import { Supplier } from "./suppliers";

export interface Product{
    id: number,
    code: string,
    supplier: Supplier,
    img: string,
    category: string,
    name: string,
    description?: string,
    price?: number,
    deleted:boolean
}