import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../../../models/purchase-order';
import { PurchaseOrdersService } from '../../../services/purchase-orders.service';
import Swal from 'sweetalert2';

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
    this.purchaseOrderService.cancelPurchaseOrderById(this.toDeletepurchaseOrder.id);
    
    this.purchaseOrders = this.purchaseOrderService.getPurchaseOrders();

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Se cancelo correctamente la orden de compra n°: " + this.toDeletepurchaseOrder.id,
    });
    
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