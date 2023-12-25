export interface Supplier{
    code: string,
    businessName: string,
    category: string,
    businessContact: BusinessContact,
    address: Address,
    taxData: TaxData,
    contactData: ContactData,
    deleted:boolean,
}

export interface BusinessContact{
    webPage: string,
    email: string,
    phone: number,
}

export interface Address{
    streetName: string,
    number: number,
    cp: string,
    city: string,
    province: string,
    country: string,
}

export interface TaxData{
    cuit: number,
    ivaCondition: string,
}

export interface ContactData{
    name: string,
    lastName: string,
    phone: number,
    email: string,
    rol: string,
}