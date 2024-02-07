import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { SuppliersService } from './suppliers.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private suppliersService: SuppliersService) {
  }

  
}
