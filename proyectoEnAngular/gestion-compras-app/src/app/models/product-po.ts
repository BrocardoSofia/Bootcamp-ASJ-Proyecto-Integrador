import { Product } from "./product";
import { ProductCategory } from "./product-category";
import { PurchaseOrder } from "./purchase-order";

export interface ProductPurchase{
    id: number,
    purchaseOrder: PurchaseOrder,
    product: Product,
    productCategory: ProductCategory,
    price: number,
    amount: number,
    createdAt: Date
}