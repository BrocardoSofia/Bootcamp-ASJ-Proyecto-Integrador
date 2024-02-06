import { Injectable } from '@angular/core';
import { SupplierCategory } from '../models/supplier-category';

@Injectable({
  providedIn: 'root'
})
export class SupplierCategoriesService {
  private url: string = 'http://localhost:8080/supplier-categories';

  constructor() { }

  public inicUser(){
    let supplierCategory: SupplierCategory = {
      id: 0,
      category: '',
      createdAt: new Date,
      updatedAt: null,
      deletedAt: null
    }

    return supplierCategory;
  }

  //ver si existe la categoria

  //agregar categoria

  //modificar categoria

  //eliminar categoria
}
