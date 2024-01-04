import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../../../models/purchase-order';
import { PurchaseOrdersService } from '../../../services/purchase-orders.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-purchase-order-detail',
  templateUrl: './purchase-order-detail.component.html',
  styleUrl: './purchase-order-detail.component.css'
})
export class PurchaseOrderDetailComponent implements OnInit{
  purchaseOrder!: PurchaseOrder | null;

  constructor(
    private purchaseOrdersService: PurchaseOrdersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ){}

  ngOnInit(): void {
    let codeParam;
    this.activeRoute.queryParamMap.subscribe((params) => {
      codeParam = params.get('detailPurchaseOrder') || null;

      if (codeParam !== null) {
        this.purchaseOrder = this.purchaseOrdersService.getPurchaseOrderByCode(parseInt(codeParam));
      }

      console.log(this.purchaseOrder);
    });
  }

  getStatus(){
    let status;

    if(this.purchaseOrder?.cancelled){
      status = 'Cancelado';
    }else{
      status = 'Aprobado';
    }

    return status;
  }

  calculateProductPrice(amount: number ,price: number | undefined){
    let total = 0;

    if(price !==  undefined){
      total = (amount * price);
    }
    return total;
  }

}
