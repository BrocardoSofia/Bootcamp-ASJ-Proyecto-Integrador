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

  constructor(private purchaseOrderService: PurchaseOrdersService){}

  ngOnInit() {
    this.purchaseOrders = this.purchaseOrderService.getPurchaseOrders();
  }
}