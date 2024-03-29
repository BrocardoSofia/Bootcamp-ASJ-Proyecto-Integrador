import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { SuppliersService } from './suppliers.service';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductImage } from '../models/product-image';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url: string = 'http://localhost:8080/products';
  private urlImages: string = 'http://localhost:8080/product-images';

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

  public addProductImage(productImage: ProductImage): Observable<ProductImage> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<ProductImage>(this.urlImages, productImage, { headers });
  }

  //get last number
  countProducts(): Observable<number> {
    let urlGet = this.url+"/count";

    return this.http.get<number>(urlGet);
  }

  public deleteProductImage(productImage: ProductImage): Observable<Product> {
    const url = this.urlImages + "/" + productImage.id;

    return this.http.delete<Product>(url);
  }

  public updateProduct(product: Product): Observable<Product> {
    const headers = { 'Content-Type': 'application/json' };
    const url = this.url + "/" + this.loginService.getUserId();
    return this.http.put<Product>(url, product, { headers });
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

  //get all products filtered
  getAllProducts(pageNumber:number, orderBy: string, productDescription: string,
    productName: string, codeSKU: string, productCategoryId: number): Observable<any> {
    let urlGet = this.url+"?page="+pageNumber+"&size=10"+orderBy+"&productDescription="+productDescription
        +"&productName="+productName+"&codeSKU="+codeSKU+"&productCategoryId="+productCategoryId;

    return this.http.get(urlGet);
  }

  //get all active products filtered
  getAllActiveProducts(pageNumber:number, orderBy: string, productDescription: string,
    productName: string, codeSKU: string, productCategoryId: number): Observable<any> {
    let urlGet = this.url+"/active"+"?page="+pageNumber+"&size=10"+orderBy+"&productDescription="+productDescription
        +"&productName="+productName+"&codeSKU="+codeSKU+"&productCategoryId="+productCategoryId;

    return this.http.get(urlGet);
  }

  //get all deleted products filtered
  getAllDeletedProducts(pageNumber:number, orderBy: string, productDescription: string,
    productName: string, codeSKU: string, productCategoryId: number): Observable<any> {
    let urlGet = this.url+"/deleted"+"?page="+pageNumber+"&size=10"+orderBy+"&productDescription="+productDescription
        +"&productName="+productName+"&codeSKU="+codeSKU+"&productCategoryId="+productCategoryId;

    return this.http.get(urlGet);
  }

  getProductById(id: number): Observable<Product>{
    const url = this.url+'/'+id;

    return new Observable<Product>(observer => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const product: Product = data;
          observer.next(product);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  //get all products filtered by supplier
  getAllProductsBySupplierId(supplierId: number): Observable<Product[]> {
    let urlGet = this.url+"/bySupplierId/"+supplierId;

    return this.http.get<Product[]>(urlGet);
  }
}
