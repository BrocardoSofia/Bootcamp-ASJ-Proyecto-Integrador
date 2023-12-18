import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../models/suppliers';
import { SuppliersService } from '../../services/suppliers.service';

@Component({
  selector: 'app-suppliers-create',
  templateUrl: './suppliers-create.component.html',
  styleUrl: './suppliers-create.component.css'
})
export class SuppliersCreateComponent{

  supplier!: Supplier;
  code!: string;
  businessName!: string;
  category!: string;
  businessemail!: string;
  webPage!: string;
  buisnessphone!: number;
  streetName!: string;
  streetNumber!: number;
  cp!:string;
  city!:string;
  province!: string;
  country!:string;
  ciut!:number;
  ivaCondition!:string;
  name!:string;
  lastName!:string;
  contactPhone!:number;
  contactEmail!:string;
  rol!:string;

  constructor(private suppliersService: SuppliersService){}

  submitSupplier(){

    this.supplier = {
      code: this.code,
      businessName: this.businessName,
      category: this.category,
      businessContact: {
        webPage: this.webPage,
        email: this.businessemail,
        phone: this.buisnessphone
      },
      address: {
        streetName: this.streetName,
        number: this.streetNumber,
        cp: this.cp,
        city: this.city,
        province: this.province,
        country: this.country
      },
      taxData: {
        cuit: this.ciut,
        ivaCondition: this.ivaCondition
      },
      contactData: {
        name: this.name,
        lastName: this.lastName,
        phone: this.contactPhone,
        email: this.contactEmail,
        rol: this.rol
      } 
    }

    this.suppliersService.addSupplier(this.supplier);
  }
}
