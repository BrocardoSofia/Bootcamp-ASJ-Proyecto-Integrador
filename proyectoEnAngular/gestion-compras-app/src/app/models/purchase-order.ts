import { Supplier } from "./suppliers";
import { ProductPurchase } from "./product-po";

export interface PurchaseOrder{
    number: number,
    emissionDate: Date,
    deliveryDate: Date,
    receptionInfo: string,
    supplier: Supplier,
    products: ProductPurchase[],
    total: number,
}