import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { SuppliersService } from './suppliers.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url: string = 'http://localhost:8080/products';

  constructor(private suppliersService: SuppliersService) {
  }

  inicProduct(){
    
  }

  
}
