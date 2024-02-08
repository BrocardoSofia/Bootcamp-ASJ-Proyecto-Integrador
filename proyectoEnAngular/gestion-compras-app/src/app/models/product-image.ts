import { Product } from "./product";

export interface ProductImage{
    id: number,
    imageURL: string,
    product: Product,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
}