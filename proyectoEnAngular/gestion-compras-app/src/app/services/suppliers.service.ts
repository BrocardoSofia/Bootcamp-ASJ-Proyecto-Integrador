import { Injectable } from '@angular/core';
import { Address, BusinessContact, ContactData, Supplier, TaxData } from '../models/suppliers';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor() { }

  /*Inicializa un proveedor con datos en vacio*/
  public inicSupplier(){
    let supplier:Supplier = {
      code: -1,
      businessName: '',
      category: '',
      businessContact: {
        webPage: '',
        email: '',
        phone: ''
      },
      address: {
        streetName: '',
        number: '',
        cp: '',
        city: '',
        province: '',
        country: '',
    },
      taxData: {
        cuit: '',
        ivaCondition: '',
    },
      contactData: {
        name: '',
        lastName: '',
        phone: '',
        email: '',
        rol: '',
    },
      deleted:false,
    }

    return supplier;
  }
  
  /*
  Agrega un nuevo proveedor al localStorage
  */
  public addSupplier(supplier: Supplier){
    const suppliers: Supplier[] = JSON.parse(localStorage.getItem('suppliers') || '[]');
    suppliers.push(supplier);
    //guardo el arreglo en el localStorage
    window.localStorage.setItem('suppliers', JSON.stringify(suppliers));
  }

  /*
  Retorna todos los proveedores que no esten eliminados
  */
  public getSuppliers(){
    const suppliers: Supplier[] = JSON.parse(localStorage.getItem('suppliers') || '[]');
    
    return suppliers.filter((supplier)=>supplier.deleted === false);
  }

  /*
  Retorna la cantidad de proveedores que hay almacenados
  */
  public cantSuppliers(){
    const suppliers: Supplier[] = JSON.parse(localStorage.getItem('suppliers') || '[]');

    let cant = 0;

    for(let supplier of suppliers){
      if(supplier.deleted === false){
        cant++;
      }
    }
    
    return cant;
  }

  /*
  Verifica si ya existe un codigo

  return boolean
  si existe retorna true
  si no existe retorna false
  */
  public existsCode(code: number){
    const suppliers: Supplier[] = JSON.parse(localStorage.getItem('suppliers') || '[]');

    //verifico si existe el codigo
    let exist = false;
    let i = 0;

    while(exist===false && i<suppliers.length){
      if(suppliers[i].code === code){
        exist = true;
      }
      i++;
    }
    return exist;
  }

  /*
  Verifica si ya existe un CUIT

  return boolean
  si existe retorna true
  si no existe retorna false
  */
  public existsCUIT(CUIT: string){
    const suppliers: Supplier[] = JSON.parse(localStorage.getItem('suppliers') || '[]');

    //verifico si existe el codigo
    let exist = false;
    let i = 0;

    while(exist===false && i<suppliers.length){
      if(suppliers[i].taxData.cuit === CUIT){
        exist = true;
      }
      i++;
    }
    return exist;
  }

  /*
  Verifica si ya existe una razon social

  return boolean
  si existe retorna true
  si no existe retorna false
  */
  public existsbusinessName(businessName: string){
    const suppliers: Supplier[] = JSON.parse(localStorage.getItem('suppliers') || '[]');

    //verifico si existe el codigo
    let exist = false;
    let i = 0;

    while(exist===false && i<suppliers.length){
      if(suppliers[i].businessName.toLowerCase() === businessName.toLowerCase()){
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
  public deleteSupplier(code: number){
    const suppliers: Supplier[] = JSON.parse(localStorage.getItem('suppliers') || '[]');

    let deleted = false;
    let i=0;

    while(deleted===false && i<suppliers.length){
      if(suppliers[i].code === code){
        suppliers[i].deleted = true;
        console.log("eliminado");
        deleted = true;
      }
      i++;
    }

    //actualizo el localStorage
    window.localStorage.setItem('suppliers', JSON.stringify(suppliers));

    return deleted;
  }

  /*
  devuelve el proveedor con el codigo recibido
  
  return Supplier
  si esta retorna el proveedor
  si no esta retorna null
  */
  public getSupplier(code: number){
    const suppliers: Supplier[] = JSON.parse(localStorage.getItem('suppliers') || '[]');

    let supplier = null;
    let i=0;

    while(supplier===null && i<suppliers.length){
      if(suppliers[i].code == code){
        supplier = suppliers[i];
      }
      i++;
    }

    return supplier;
  }


  /*
  esta funcion analiza si el proveedor esta eliminado
  
  return boolean
  si esta eliminado true
  si no esta eliminado devuelve false
  */
  public verifyDeletedSupplier(ciut: string){
    const suppliers: Supplier[] = JSON.parse(localStorage.getItem('suppliers') || '[]');

    let deleted = false;
    let i=0;

    while(deleted===false && i<suppliers.length){
      if(suppliers[i].taxData.cuit === ciut){
        deleted = suppliers[i].deleted;
      }
      i++;
    }

    return deleted;
  }

  /*
  esta funcion devuelve un proveedor con el mismo cuit

  return Supplier
  si esta lo retorna
  si no esta retorna null
  */
  public getSupplierByCuit(ciut: string){
    const suppliers: Supplier[] = JSON.parse(localStorage.getItem('suppliers') || '[]');

    let supplier:Supplier|null = null;
    let i=0;

    while(supplier===null && i<suppliers.length){
      if(suppliers[i].taxData.cuit === ciut){
        supplier = suppliers[i];
      }
      i++;
    }

    return supplier;
  }

  /*
  esta funcion reinserta un proveedor a traves de su codigo
  
  return boolean
  si lo reinserta devuelve true
  si no lo encuentra devuelve false
  */
  public reInsertSupplier(code: number, supplier:Supplier){
    let suppliers: Supplier[] = JSON.parse(localStorage.getItem('suppliers') || '[]');

    let reInsert = false;
    let i=0;

    while(reInsert===false && i<suppliers.length){
      if(suppliers[i].code === code){
        suppliers[i] = supplier;
        suppliers[i].deleted = false;
        reInsert = true;
      }
      i++;
    }

    //actualizo el localStorage
    window.localStorage.setItem('suppliers', JSON.stringify(suppliers));

    return reInsert;
  }

  /*
  Agrega un nuevo proveedor al localStorage
  */
  public modifySupplier(supplier: Supplier){
    const suppliers: Supplier[] = JSON.parse(localStorage.getItem('suppliers') || '[]');

    //busco el proveedor y lo modifico en el arreglo
    let modified = false;
    let i=0;

    while(modified===false && i<suppliers.length){
      if(suppliers[i].code === supplier.code){
        suppliers[i] = supplier;
        modified = true;
        console.log(suppliers[i]);
      }
      i++;
    }

    console.log(suppliers);

    //guardo el arreglo en el localStorage
    window.localStorage.setItem('suppliers', JSON.stringify(suppliers));

    return modified;
  }

  public getLastCode(){
    const suppliers: Supplier[] = JSON.parse(localStorage.getItem('suppliers') || '[]');
    let lastCode = 0;

    if(suppliers.length !== 0){
      lastCode = suppliers[suppliers.length-1].code;
    }

    return lastCode;
  }
}