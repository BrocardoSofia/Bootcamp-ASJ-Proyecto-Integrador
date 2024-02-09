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
  purchaseOrders!: PurchaseOrder;
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
            this.purchaseOrders = response;
            
          }else{
            //lo redirijo a la pagina anterior
            this.router.navigate(['/purchase-orders']);
          }
          
        });
      }
    });
  }

  

}
