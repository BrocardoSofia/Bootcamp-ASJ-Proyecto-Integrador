import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { SuppliersService } from './suppliers.service';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url: string = 'http://localhost:8080/products';

  constructor(private suppliersService: SuppliersService,
              private loginService: LoginService,
              private http: HttpClient) {
  }

  inicProduct(){
    let product: Product = {
      id: 0,
      supplier: this.suppliersService.inicSupplier(),
      productCategory: {
        id: 0,
        category: '',
        supplierCategory: {
          id: 0,
          category: '',
          createdAt: new Date,
          updatedAt: null,
          deletedAt: null,
          products: []
        },
        createdAt: new Date,
        updatedAt: null,
        deletedAt: null
      },
      createdBy: {
        id: 0,
        userAlias: '',
        password: '',
        createdAt: new Date,
        updatedAt: null,
        deletedAt: null
      },
      codeSKU: '',
      productName:'',
      price:0,
      stock:0,
      productDescription: '',
      createdAt: new Date,
      updatedAt: null,
      deletedAt: null,
      productImages: []
    }

    return product;
  }

  public addProduct(product: Product): Observable<Product> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<Product>(this.url, product, { headers });
  }

  public updateProduct(product: Product): Observable<Product> {
    const headers = { 'Content-Type': 'application/json' };
    const url = this.url + "/" + this.loginService.getUserId();
    return this.http.put<Product>(this.url, product, { headers });
  }

  public codeSkuExists(codeSku: string): Observable<boolean> {
    let exist = false;
    const url = this.url + "/codeSkuExists/" + codeSku;

    return this.http.get<boolean>(url);
  }

  public deleteProduct(product: Product): Observable<Product> {
    const url = this.url + "/" + product.id + "/" + this.loginService.getUserId();

    return this.http.delete<Product>(url);
  }

  public reInsertProduct(product: Product): Observable<boolean> {
    const url = this.url + "/" + product.id + "/reInsert"+ "/" + this.loginService.getUserId();;

    return this.http.delete<boolean>(url);
  }
}
