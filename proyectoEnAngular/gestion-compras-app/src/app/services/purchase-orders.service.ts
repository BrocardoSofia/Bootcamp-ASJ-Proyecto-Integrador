import { Injectable } from '@angular/core';
import { PurchaseOrder } from '../models/purchase-order';
import { SuppliersService } from './suppliers.service';
import { Product } from '../models/product';
import { ProductPurchase } from '../models/product-po';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrdersService {

  constructor(private suppliersService: SuppliersService) {}

  
}
