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

  constructor(private purchaseOrderService: PurchaseOrdersService){}

  ngOnInit() {
  }

  
}