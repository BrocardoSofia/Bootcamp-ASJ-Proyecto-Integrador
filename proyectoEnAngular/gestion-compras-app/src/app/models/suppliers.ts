export interface Supplier{
    code: number,
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
    phone: string,
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
    cuit: string,
    ivaCondition: string,
}

export interface ContactData{
    name: string,
    lastName: string,
    phone: string,
    email: string,
    rol: string,
}