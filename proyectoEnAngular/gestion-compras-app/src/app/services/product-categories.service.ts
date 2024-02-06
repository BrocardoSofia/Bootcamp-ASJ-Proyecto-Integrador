import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoriesService {
  private url: string = 'http://localhost:8080/product-categories';

  constructor() { }
}
