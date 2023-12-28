import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../../models/purchase-order';
import { PurchaseOrdersService } from '../../services/purchase-orders.service';

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrl: './purchase-orders.component.css'
})
export class PurchaseOrdersComponent implements OnInit{
  purchaseOrders: PurchaseOrder[] = [];
  toDeletepurchaseOrder:PurchaseOrder = this.purchaseOrderService.inicPurchaseOrder();

  constructor(private purchaseOrderService: PurchaseOrdersService){}

  ngOnInit() {
    this.purchaseOrders = this.purchaseOrderService.getPurchaseOrders();
  }

  setToCancelOrder(purchaseOrder: PurchaseOrder){
    this.toDeletepurchaseOrder = purchaseOrder;
    
  }

  cancelOrder(){
    this.purchaseOrderService.cancelPurchaseOrder(this.toDeletepurchaseOrder.id);
    
    this.purchaseOrders = this.purchaseOrderService.getPurchaseOrders();
    
  }

  getStatus(cancel: boolean){
    let status;

    if(cancel){
      status = 'Cancelado';
    }else{
      status = 'Aprobado';
    }

    return status;
  }
}