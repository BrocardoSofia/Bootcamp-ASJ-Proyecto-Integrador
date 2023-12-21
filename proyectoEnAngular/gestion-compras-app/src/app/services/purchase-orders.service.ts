import { Injectable } from '@angular/core';
import { PurchaseOrder } from '../models/purchase-order';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrdersService {
  private purchaseOrders: PurchaseOrder[] = [];

  constructor() { 
    //inicializo el arreglo con los datos almacenados en el localStorage
    this.purchaseOrders = JSON.parse(localStorage.getItem('purchaseOrders') || '[]');
  }

  public addPurchaseOrder(purchaseOrders: PurchaseOrder){
    this.purchaseOrders.push(purchaseOrders);
    //guardo el arreglo en el localStorage
    window.localStorage.setItem('purchaseOrders', JSON.stringify(this.purchaseOrders));
  }

  public getPurchaseOrders(){
    return this.purchaseOrders;
  }
}
