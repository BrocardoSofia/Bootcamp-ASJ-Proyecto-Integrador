import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../../../models/purchase-order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supplier } from '../../../models/suppliers';
import { PurchaseOrdersService } from '../../../services/purchase-orders.service';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliersService } from '../../../services/suppliers.service';
import { ProductPurchase } from '../../../models/product-po';
import { Product } from '../../../models/product';
import Swal from 'sweetalert2';
import { auto } from '@popperjs/core';

@Component({
  selector: 'app-purchase-orders-create',
  templateUrl: './purchase-orders-create.component.html',
  styleUrl: './purchase-orders-create.component.css'
})
export class PurchaseOrdersCreateComponent implements OnInit {
  

  constructor(
    private suppliersService: SuppliersService,
    private productsService: ProductsService,
    private purchaseOrdersService: PurchaseOrdersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    

  }

  
}