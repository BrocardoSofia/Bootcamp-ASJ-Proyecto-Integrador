import { ProductCategory } from "./product-category";

export interface SupplierCategory{
    id: number,
    category: string,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    products: Array<ProductCategory>
}