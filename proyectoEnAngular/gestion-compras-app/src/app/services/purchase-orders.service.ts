import { Injectable } from '@angular/core';
import { PurchaseOrder } from '../models/purchase-order';
import { SuppliersService } from './suppliers.service';
import { Product } from '../models/product';
import { ProductPurchase } from '../models/product-po';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrdersService {
  private url: string = 'http://localhost:8080/purchase-orders';

  constructor(private http: HttpClient,
              private loginService: LoginService,
              private productService: ProductsService) {}

  
}
