import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from '../models/product-category';
import { SupplierCategoriesService } from './supplier-categories.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoriesService {
  private url: string = 'http://localhost:8080/product-categories';

  constructor(private http: HttpClient,
              private supplierCategoryService: SupplierCategoriesService) { }

  public inicProductCategory(){
    let productCategory: ProductCategory = {
      id: 0,
      category: '',
      createdAt: new Date,
      updatedAt: null,
      deletedAt: null,
      supplier: this.supplierCategoryService.inicSupplierCategory()
    }

    return productCategory;
  }
}
