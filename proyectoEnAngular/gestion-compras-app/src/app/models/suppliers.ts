export class Supplier{
    code: string;
    businessName: string;
    category: string;
    businessContact: BusinessContact;
    address: Address;
    taxData: TaxData;
    contactData: ContactData;
    deleted:boolean;

    constructor(code: string, businessName: string, category: string, businessContact: BusinessContact,
        address: Address, taxData: TaxData, contactData: ContactData){
        this.code = code;
        this.businessName = businessName;
        this.category = category;
        this.businessContact = businessContact;
        this.address = address;
        this.taxData = taxData;
        this.contactData = contactData;
        this.deleted = false;
    }
}

export class BusinessContact{
    webPage: string;
    email: string;
    phone: number;

    constructor(webPage: string, email: string, phone: number){
        this.webPage = webPage;
        this.email = email;
        this.phone = phone;
    }
}

export class Address{
    streetName: string;
    number: number;
    cp: string;
    city: string;
    province: string;
    country: string;

    constructor(streetName: string, number: number, cp: string, city: string, 
        province: string, country: string){
            this.streetName = streetName;
            this.number = number;
            this.cp = cp;
            this.city = city;
            this.province = province;
            this.country = country;
        }
}

export class TaxData{
    cuit: number;
    ivaCondition: string;

    constructor(cuit: number, ivaCondition: string){
        this.cuit = cuit;
        this.ivaCondition = ivaCondition;
    }
}

export class ContactData{
    name: string;
    lastName: string;
    phone: number;
    email: string;
    rol: string;

    constructor(name: string, lastName: string, phone: number, email: string,
        rol: string){
            this.name = name;
            this.lastName = lastName;
            this.phone = phone;
            this.email = email;
            this.rol = rol;
    }
}