import { Supplier } from "./suppliers";
import { ProductPurchase } from "./product-po";

export interface PurchaseOrder{
    id: number,
    emissionDate?: Date,
    deliveryDate?: Date,
    receptionInfo: string,
    supplier: Supplier,
    products: ProductPurchase[],
    total: number,
    cancelled: boolean
}