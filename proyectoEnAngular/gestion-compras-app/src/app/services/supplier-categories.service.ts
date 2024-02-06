import { Injectable } from '@angular/core';
import { SupplierCategory } from '../models/supplier-category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierCategoriesService {
  private url: string = 'http://localhost:8080/supplier-categories';

  constructor(private http: HttpClient) { }

  public inicSupplierCategory(){
    let supplierCategory: SupplierCategory = {
      id: 0,
      category: '',
      createdAt: new Date,
      updatedAt: null,
      deletedAt: null
    }

    return supplierCategory;
  }

  //ver si existe la categoria
  public categoryExists(category: string): Observable<boolean> {
    let exist = false;
    const url = this.url + "/exist/" + category;

    return this.http.get<boolean>(url);
  }

  //agregar categoria
  public addCategory(supplierCategory: SupplierCategory): Observable<SupplierCategory> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<SupplierCategory>(this.url, supplierCategory, { headers });
  }

  //modificar categoria
  public updateCategory(supplierCategory: SupplierCategory): Observable<SupplierCategory> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<SupplierCategory>(this.url, supplierCategory, { headers });
  }

  //eliminar categoria
  public deleteCategory(supplierCategory: SupplierCategory): Observable<SupplierCategory> {
    const url = this.url + "/" + supplierCategory.id;

    return this.http.delete<SupplierCategory>(url);
  }

  getSupplierCategories(): Observable<any> {
    const params = {
      page: '0',
      size: '10'
    };

    return this.http.get(this.url, { params });
  }
}
