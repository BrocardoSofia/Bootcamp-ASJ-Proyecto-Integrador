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

  /*
  Agrega un nuevo proveedor al localStorage
  */
  public addSupplier(supplier: Supplier){
    this.suppliers.push(supplier);
    //guardo el arreglo en el localStorage
    window.localStorage.setItem('suppliers', JSON.stringify(this.suppliers));
  }

  /*
  Retorna todos los proveedores que no esten eliminados
  */
  public getSuppliers(){
    let notDeleted = this.suppliers.filter((supplier)=>supplier.deleted === false)
    console.log("Proveedores");
    console.log(notDeleted);
    return this.suppliers.filter((supplier)=>supplier.deleted === false);
  }

  /*
  Verifica si ya existe un codigo

  return boolean
  si existe retorna true
  si no existe retorna false
  */
  public existsCode(code: string){
    //verifico si existe el codigo
    let exist = false;
    let i = 0;

    while(exist===false && i<this.suppliers.length){
      if(this.suppliers[i].code === code){
        exist = true;
      }
      i++;
    }
    return exist;
  }

  /*
  esta funcion elimina un proveedor a traves de su codigo
  
  return boolean
  si lo elimina devuelve true
  si no lo encuentra devuelve false
  */
  public deleteSupplier(code: string){
    let deleted = false;
    let i=0;

    while(deleted===false && i<this.suppliers.length){
      if(this.suppliers[i].code === code){
        this.suppliers[i].deleted = true;
        console.log("eliminado");
        deleted = true;
      }
      i++;
    }

    //actualizo el localStorage
    window.localStorage.setItem('suppliers', JSON.stringify(this.suppliers));

    return deleted;
  }
}
