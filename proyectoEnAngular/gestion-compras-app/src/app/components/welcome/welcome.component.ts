import { Component, OnInit } from '@angular/core';
import { SuppliersService } from '../../services/suppliers.service';
import { ProductsService } from '../../services/products.service';
import { PurchaseOrdersService } from '../../services/purchase-orders.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{
  amountSuppliers: number = 0;
  amountProducts: number = 0;
  amountPurchaseOrders: number = 0;

  constructor(private supplierService: SuppliersService,
    private productService: ProductsService,
    private purchaseOrderService: PurchaseOrdersService){
  }
  ngOnInit(): void {
    this.supplierService.countSuppliers().subscribe(
      suppliers=>{
        this.amountSuppliers = suppliers;
      }
    )

    this.productService.countProducts().subscribe(
      products=>{
        this.amountProducts = products;
      }
    )

    this.purchaseOrderService.countPurchaseOrderNumber().subscribe(
      purchaseOrder=>{
        this.amountPurchaseOrders = purchaseOrder;
      }
    )
  }
}
