import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products:Product[] = [];

  constructor() {
    //inicializo el arreglo con los datos almacenados en el localStorage
    this.products = JSON.parse(localStorage.getItem('products') || '[]');
  }

  public addProduct(products: Product){
    this.products.push(products);
    //guardo el arreglo en el localStorage
    window.localStorage.setItem('products', JSON.stringify(this.products));
  }

  public getProducts(){
    return this.products;
  }
}
