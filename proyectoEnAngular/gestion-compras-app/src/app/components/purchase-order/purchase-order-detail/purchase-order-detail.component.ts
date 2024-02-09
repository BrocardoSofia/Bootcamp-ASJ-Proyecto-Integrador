import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../../../models/purchase-order';
import { PurchaseOrdersService } from '../../../services/purchase-orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductPurchase } from '../../../models/product-po';

@Component({
  selector: 'app-purchase-order-detail',
  templateUrl: './purchase-order-detail.component.html',
  styleUrl: './purchase-order-detail.component.css'
})
export class PurchaseOrderDetailComponent implements OnInit{
  purchaseOrder!: PurchaseOrder;
  idParam: number = 0;

  constructor(
    private router: Router,
    private purchaseOrdersService: PurchaseOrdersService,
    private activeRoute: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((params) => {
      let param = params.get('purchaseOrderId') || null;

      if (param !== null) {
        this.idParam = parseInt(param);

        this.purchaseOrdersService.getPurchaseOrderById(this.idParam).subscribe(response => {

          if(response !== null){
            this.purchaseOrder = response;
            
          }else{
            //lo redirijo a la pagina anterior
            this.router.navigate(['/purchase-orders']);
          }
          
        });
      }
    });
  }

  getTotal(product: ProductPurchase){
    return (product.price * product.amount);
  }
  
  getFinal(){
    let final: number = 0;

    for(let product of this.purchaseOrder.purchaseOrdersProducts){
      final += (product.amount * product.price);
    }
    return final;
  }
}
