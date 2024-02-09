import { Supplier } from "./suppliers";
import { ProductPurchase } from "./product-po";
import { PurchaseState } from "./purchase-state";
import { User } from "./user";
import { PurchaseOrderProduct } from "./purchase-order-product";

export interface PurchaseOrder{
    id: number,
    purchaseState: PurchaseState,
    createdBy: User,
    supplier: Supplier,
    purchaseOrderNumber: number,
    deliveryDate: Date,
    receptionInfo: string,
    createdAt: Date,
    updatedAt: Date | null,
    purchaseOrdersProducts: PurchaseOrderProduct[]
}