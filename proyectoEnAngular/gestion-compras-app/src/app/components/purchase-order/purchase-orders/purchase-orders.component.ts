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

  purchaseOrder:PurchaseOrder[] = [];
  currentPage: number = 0;
  pages:number = 1;
  maxPages: number = 5;
  nextFive: boolean = false;
  previous: boolean = false;

  constructor(private purchaseOrderService: PurchaseOrdersService){}

  ngOnInit() {

    this.purchaseOrderService.getPurchaseOrders(0,'').subscribe(data=>{
      this.pages = data.totalPages;
      this.purchaseOrder = data.content;

      if(this.pages > 5){
        this.nextFive = true;
      }
    })
  }

  getPages(): number[] {
    this.pages;
    let startPage = Math.max(1, this.currentPage - Math.floor(this.maxPages / 2));
    let endPage = Math.min(this.pages, startPage + this.maxPages - 1);
  
    if(this.pages > 5){
      if(endPage-startPage != 4){
        startPage = endPage-4;
      }
    }
    let returnPages = Array.from(Array(Math.min(5, endPage - startPage + 1)), (_, i) => startPage + i);
  
    return returnPages;
  }

  selectPage(page: number){
    this.purchaseOrderService.getPurchaseOrders(page,'').subscribe(data=>{
      this.pages = data.totalPages;
      this.purchaseOrder = data.content;

      if(this.pages > 5){
        this.nextFive = true;
      }
    })
  }

  nextPage(){
    this.currentPage++;
    this.selectPage(this.currentPage);
  }

  prevPage(){
    this.currentPage--;
    this.selectPage(this.currentPage);
  }

  getTotal(purchaseOrder:PurchaseOrder){
    let total: number = 0;

    for(let product of purchaseOrder.purchaseOrdersProducts){
      total += (product.amount * product.price);
    }
    return total;
  }
  
}