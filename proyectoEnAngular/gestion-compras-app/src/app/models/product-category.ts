import { SupplierCategory } from "./supplier-category"

export interface ProductCategory{
    id: number,
    category: string,
    supplierCategory: SupplierCategory,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
}