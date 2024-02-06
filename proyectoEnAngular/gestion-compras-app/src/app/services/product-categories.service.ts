import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from '../models/product-category';
import { SupplierCategoriesService } from './supplier-categories.service';
import { Observable } from 'rxjs';

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

  //ver si existe la categoria
  public categoryExists(category: string): Observable<boolean> {
    let exist = false;
    const url = this.url + "/exist/" + category;

    return this.http.get<boolean>(url);
  }

  //agregar categoria
  public addCategory(productCategory: ProductCategory): Observable<ProductCategory> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<ProductCategory>(this.url, productCategory, { headers });
  }

  //modificar categoria
  public updateCategory(productCategory: ProductCategory): Observable<ProductCategory> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<ProductCategory>(this.url, productCategory, { headers });
  }

  //eliminar categoria
  public deleteCategory(productCategory: ProductCategory): Observable<ProductCategory> {
    const url = this.url + "/" + productCategory.id;

    return this.http.delete<ProductCategory>(url);
  }

  getProductCategories(): Observable<any> {
    const params = {
      page: '0',
      size: '10'
    };

    return this.http.get(this.url, { params });
  }

  //get all categories filtered
  getAllCategories(pageNumber:number, orderBy: string, category: string): Observable<any> {
    let urlGet = this.url+"?page="+pageNumber+"&size=10"+orderBy+"&category="+category;

    return this.http.get(urlGet);
  }

  //get active categories filtered
  getAllActiveCategories(pageNumber:number, orderBy: string, category: string): Observable<any> {
    let urlGet = this.url+"/active"+"?page="+pageNumber+"&size=10"+orderBy+"&category="+category;

    return this.http.get(urlGet);
  }

  //get deleted categories filtered
  getAllDeletedCategories(pageNumber:number, orderBy: string, category: string): Observable<any> {
    let urlGet = this.url+"/deleted"+"?page="+pageNumber+"&size=10"+orderBy+"&category="+category;

    return this.http.get(urlGet);
  }

  public reInsertCategory(productCategory: ProductCategory): Observable<boolean> {
    const url = this.url + "/" + productCategory.id + "/reInsert";

    return this.http.delete<boolean>(url);
  }

  getCategoryById(id: number): Observable<ProductCategory>{
    const url = this.url+'/'+id;

    return new Observable<ProductCategory>(observer => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const productCategory: ProductCategory = data;
          observer.next(productCategory);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }
}
