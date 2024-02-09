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
      deletedAt: null,
      products: []
    }

    return supplierCategory;
  }

  //ver si existe el rubro
  public categoryExists(category: string): Observable<boolean> {
    let exist = false;
    const url = this.url + "/exist/" + category;

    return this.http.get<boolean>(url);
  }

  //agregar rubro
  public addCategory(supplierCategory: SupplierCategory): Observable<SupplierCategory> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<SupplierCategory>(this.url, supplierCategory, { headers });
  }

  //modificar rubro
  public updateCategory(supplierCategory: SupplierCategory): Observable<SupplierCategory> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<SupplierCategory>(this.url, supplierCategory, { headers });
  }

  //eliminar rubro
  public deleteCategory(supplierCategory: SupplierCategory): Observable<SupplierCategory> {
    const url = this.url + "/" + supplierCategory.id;

    return this.http.delete<SupplierCategory>(url);
  }

  getSupplierCategories(): Observable<any> {
    return this.http.get(this.url);
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

  public reInsertCategory(supplierCategory: SupplierCategory): Observable<boolean> {
    const url = this.url + "/" + supplierCategory.id + "/reInsert";

    return this.http.delete<boolean>(url);
  }

  getCategoryById(id: number): Observable<SupplierCategory>{
    const url = this.url+'/'+id;

    return new Observable<SupplierCategory>(observer => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const supplierCategory: SupplierCategory = data;
          observer.next(supplierCategory);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }
}
