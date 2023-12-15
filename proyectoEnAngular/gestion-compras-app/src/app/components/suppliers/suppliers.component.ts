import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent implements OnInit{
  suppliers: Supplier[] = [];

  ngOnInit() {
    this.suppliers = [
      {code: 2121, businessName: "CocaCola", category: "food"},
      {code: 2121, businessName: "CocaCola", category: "food"},
      {code: 2121, businessName: "CocaCola", category: "food"},
      {code: 2121, businessName: "CocaCola", category: "food"},
    ]
}

}

type Supplier = {
  code: number,
  businessName: string,
  category: string,
  // businessContact: BusinessContact,
  // address: Address,
  // taxData: TaxData
}

type BusinessContact = {
  webPage: string,
  email: string,
  phone: number
}

type Address = {
  streetName: string,
  number: number,
  cp: string,
  city: string,
  province: string,
  country: string
}

type TaxData = {
  cuit: number,
  ivaCondition: string
}