import { Supplier } from "./suppliers";

export interface Product{
    supplier: Supplier,
    code: string,
    category: string,
    name: string,
    description: string,
    price: number
}