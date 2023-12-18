import { Injectable } from '@angular/core';
import { Supplier } from '../models/suppliers';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  private suppliers: Supplier[] = [];

  constructor() { }

  addSupplier(supplier: Supplier){
    this.suppliers.push(supplier);
    console.log(this.suppliers);
  }

  getSupplier(){
    return this.suppliers;
  }
}
