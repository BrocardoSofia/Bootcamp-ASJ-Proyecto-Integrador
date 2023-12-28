import { Injectable } from '@angular/core';
import { PurchaseOrder } from '../models/purchase-order';
import { SuppliersService } from './suppliers.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrdersService {

  constructor(private suppliersService: SuppliersService) {}

  public inicPurchaseOrder(){
    const purchaseOrder:PurchaseOrder = {
      id: -1,
      receptionInfo: '',
      supplier: this.suppliersService.inicSupplier(),
      products: [],
      total: -1,
      cancelled: false
  }

    return purchaseOrder;
  }

  /*
  Agrega una orden de compra al LocalStorage
  */
  public addPurchaseOrder(purchaseOrder: PurchaseOrder){
    //inicializo el arreglo con los datos almacenados en el localStorage
    let purchaseOrders: PurchaseOrder[] = JSON.parse(localStorage.getItem('purchaseOrders') || '[]');

    purchaseOrders.push(purchaseOrder);
    //guardo el arreglo en el localStorage
    window.localStorage.setItem('purchaseOrders', JSON.stringify(purchaseOrders));
  }

  /*
  Retorna todos las ordenes de compra
  */
  public getPurchaseOrders(){
    return JSON.parse(localStorage.getItem('purchaseOrders') || '[]');
  }

  /*
  Retorna la orden de compra que coincida con el numero
  */
  public getPurchaseOrderByCode(id: number){
    let purchaseOrders: PurchaseOrder[] = JSON.parse(localStorage.getItem('purchaseOrders') || '[]');
    let purchaseOrder = null;
    let i = 0;

    //busco el producto con ese id
    while(purchaseOrder === null && i<purchaseOrders.length){
      if(purchaseOrders[i].id === id){
        purchaseOrder = purchaseOrders[i];
      }
      i++;
    }

    return purchaseOrder;
  }

  /*
 Retorna el ultimo id, si no hay productos retorna 0
 */
 public getLastId(){
  const purchaseOrders: PurchaseOrder[] = JSON.parse(localStorage.getItem('purchaseOrders') || '[]');
  let lastId = 0;
    
  if(purchaseOrders.length !== 0){
    lastId = purchaseOrders[purchaseOrders.length-1].id;
  }

  return lastId;
 }


 /*
  esta funcion elimina un producto a traves de su id
  
  return boolean
  si lo elimina devuelve true
  si no lo encuentra devuelve false
  */
  public cancelPurchaseOrder(id: number){
    const purchaseOrders: PurchaseOrder[] = JSON.parse(localStorage.getItem('purchaseOrders') || '[]');

    let cancelled = false;
    let i=0;

    while(cancelled===false && i<purchaseOrders.length){
      if(purchaseOrders[i].id === id){
        purchaseOrders[i].cancelled = true;
        cancelled = true;
      }
      i++;
    }

    //actualizo el localStorage
    window.localStorage.setItem('purchaseOrders', JSON.stringify(purchaseOrders));

    return cancelled;
  }
}
