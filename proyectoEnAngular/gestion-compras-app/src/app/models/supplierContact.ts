import { Supplier } from "./suppliers";

export interface SupplierContact{
    id: number,
    supplier: Supplier,
    contactName: string,
    contactLastname: string,
    phone: string,
    email: string,
    rol: string,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
}