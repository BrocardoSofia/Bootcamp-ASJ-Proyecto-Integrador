import { IvaCondition } from "./ivaCondition";
import { Province } from "./province";
import { SupplierCategory } from "./supplier-category";
import { SupplierContact } from "./supplierContact";
import { User } from "./user";

export interface Supplier{
    id: number,
    supplierCategory: SupplierCategory,
    createdBy: User,
    province: Province,
    ivaCondition: IvaCondition,
    supplierCode: string,
    businessName: string,
    imageUrl: string,
    businessWebpage: string,
    businessEmail: string,
    businessPhone:string,
    streetName: string,
    streetNumber: number,
    city: string,
    cp: string,
    cuit: string,
    supplierContacts: Array<SupplierContact>,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
}