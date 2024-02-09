import { Supplier } from "./suppliers";
import { User } from "./user";

export interface SupplierHistory{
    id: number,
    supplier: Supplier,
    user: User,
    createdAt: Date,
    action: string,
    changes: string,
    oldSupplier: string
}