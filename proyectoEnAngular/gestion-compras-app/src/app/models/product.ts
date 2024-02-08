import { ProductCategory } from "./product-category";
import { ProductImage } from "./product-image";
import { Supplier } from "./suppliers";
import { User } from "./user";

export interface Product{
    id: number,
    supplier: Supplier,
    productCategory: ProductCategory,
    createdBy: User,
    codeSKU: string,
    productName:string,
    price:number,
    stock:number,
    productDescription?: string,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
    productImages: ProductImage[]
}