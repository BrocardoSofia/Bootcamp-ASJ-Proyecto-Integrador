import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../../../models/purchase-order';
import { PurchaseOrdersService } from '../../../services/purchase-orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-order-detail',
  templateUrl: './purchase-order-detail.component.html',
  styleUrl: './purchase-order-detail.component.css'
})
export class PurchaseOrderDetailComponent implements OnInit{

  constructor(
    private purchaseOrdersService: PurchaseOrdersService,
    private activeRoute: ActivatedRoute,
  ){}

  ngOnInit(): void {
    
  }

  

}
