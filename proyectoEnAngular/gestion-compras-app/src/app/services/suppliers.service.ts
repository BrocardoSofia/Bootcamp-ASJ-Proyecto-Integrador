import { Injectable } from '@angular/core';
import { Address, BusinessContact, ContactData, Supplier, TaxData } from '../models/suppliers';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor() { }

  /*
  Funcion para creear un proveedor
  */
  public createSupplier(pCode: string, pBusinessName: string, pCategory: string, 
    pBusinessContact: BusinessContact, pAddress: Address, pTaxData: TaxData, pContactData: ContactData){
      const supplier:Supplier = {
        code: pCode,
        businessName: pBusinessName,
        category: pCategory,
        businessContact: pBusinessContact,
        address: pAddress,
        taxData: pTaxData,
        contactData: pContactData,
        deleted:false,
      }

      return supplier;
  }

  /*
  Funcion para crear un BusinessContact
 */
  public createBusinessContact(pWebPage: string, pEmail: string, pPhone: number){
    const businessContact:BusinessContact={
      webPage: pWebPage,
      email: pEmail,
      phone: pPhone,
    }

    return businessContact;
  }

  /*
  Funcion para crear un Address
 */
  public createAddress(pStreetName: string, pNumber: number, pCp: string, pCity: string, 
    pProvince: string, pCountry: string){
      const address:Address={
        streetName: pStreetName,
        number: pNumber,
        cp: pCp,
        city: pCity,
        province: pProvince,
        country: pCountry,
      }

      return address;
    }

  /*
  Funcion para crear un TaxData
 */
  public createTaxData(pCuit: number, pIvaCondition: string){
    const taxData:TaxData={
      cuit: pCuit,
      ivaCondition: pIvaCondition,
    }

    return taxData;
  }

  /*
  Funcion para crear un ContactData
 */
  public createContactData(pName: string, pLastName: string, pPhone: number, pEmail: string,
    pRol: string){
      const contactData:ContactData={
        name: pName,
        lastName: pLastName,
        phone: pPhone,
        email: pEmail,
        rol: pRol,
      }

      return contactData;
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
  Verifica si ya existe un codigo

  return boolean
  si existe retorna true
  si no existe retorna false
  */
  public existsCode(code: string){
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
  esta funcion elimina un proveedor a traves de su codigo
  
  return boolean
  si lo elimina devuelve true
  si no lo encuentra devuelve false
  */
  public deleteSupplier(code: string){
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
  esta funcion analiza si el proveedor esta eliminado
  
  return boolean
  si esta eliminado true
  si no esta eliminado devuelve false
  */
  public verifyDeletedSupplier(code: string){
    const suppliers: Supplier[] = JSON.parse(localStorage.getItem('suppliers') || '[]');

    let deleted = false;
    let i=0;

    while(deleted===false && i<suppliers.length){
      if(suppliers[i].code === code){
        deleted = suppliers[i].deleted;
      }
      i++;
    }

    return deleted;
  }

  /*
  esta funcion reinserta un proveedor a traves de su codigo
  
  return boolean
  si lo reinserta devuelve true
  si no lo encuentra devuelve false
  */
  public reInsertSupplier(code: string){
    const suppliers: Supplier[] = JSON.parse(localStorage.getItem('suppliers') || '[]');

    let reInsert = false;
    let i=0;

    while(reInsert===false && i<suppliers.length){
      if(suppliers[i].code === code){
        suppliers[i].deleted = false;
        reInsert = true;
      }
      i++;
    }

    //actualizo el localStorage
    window.localStorage.setItem('suppliers', JSON.stringify(suppliers));

    return reInsert;
  }
}
