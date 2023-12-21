import { Injectable } from '@angular/core';
import { Supplier } from '../models/suppliers';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  private suppliers: Supplier[] = [];

  constructor() { 
    //inicializo el arreglo con los datos almacenados en el localStorage
    this.suppliers = JSON.parse(localStorage.getItem('suppliers') || '[]');
  }

  public addSupplier(supplier: Supplier){
    this.suppliers.push(supplier);
    //guardo el arreglo en el localStorage
    window.localStorage.setItem('suppliers', JSON.stringify(this.suppliers));
  }

  public getSuppliers(){
    return this.suppliers;
  }
}
