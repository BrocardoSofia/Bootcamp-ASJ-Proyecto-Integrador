import { Injectable } from '@angular/core';
import { PurchaseOrder } from '../models/purchase-order';
import { SuppliersService } from './suppliers.service';
import { Product } from '../models/product';
import { ProductPurchase } from '../models/product-po';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { ProductsService } from './products.service';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrdersService {
  private url: string = 'http://localhost:8080/purchase-orders';
  private urlPurchaseOrderProduct: string = 'http://localhost:8080/purchase-order-product';
  private urlPurchaseState: string = 'http://localhost:8080/purchase-states';

  constructor(private http: HttpClient,
              private loginService: LoginService,
              private productService: ProductsService,
              private userService: UsersService,
              private supplierService: SuppliersService) {}

  inicPurchaseOrder(){
    let purchaseOrder: PurchaseOrder = {
      id: 0,
      purchaseState: {
        id: 0,
        purchaseState: '',
        createdAt: new Date
      },
      createdBy: this.userService.inicUser(),
      supplier: this.supplierService.inicSupplier(),
      purchaseOrderNumber: 0,
      deliveryDate: new Date,
      receptionInfo: '',
      createdAt: new Date,
      updatedAt: null,
      purchaseOrdersProducts: []
    }

    return purchaseOrder;
  }

  public addPurchaseOrder(purchaseOrder: PurchaseOrder): Observable<PurchaseOrder> {
    const headers = { 'Content-Type': 'application/json' };
    purchaseOrder.createdBy.id = this.loginService.getUserId();
    return this.http.post<PurchaseOrder>(this.url, purchaseOrder, { headers });
  }

  public addPurchaseOrderProduct(productPurchase: ProductPurchase): Observable<PurchaseOrder> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<PurchaseOrder>(this.urlPurchaseOrderProduct, productPurchase, { headers });
  }

  public updatePurchaseOrder(purchaseOrder: PurchaseOrder): Observable<PurchaseOrder> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<PurchaseOrder>(this.url, purchaseOrder, { headers });
  }

  //get normal
  getPurchaseOrders(pageNumber:number, orderBy: string): Observable<any> {
    let urlGet = this.url+"?page="+pageNumber+"&size=10"+orderBy;

    return this.http.get(urlGet);
  }

  //get last number
  getLastPurchaseOrderNumber(): Observable<number> {
    let urlGet = this.url+"/last-purchaseOrderNumber";

    return this.http.get<number>(urlGet);
  }

  //get last number
  countPurchaseOrderNumber(): Observable<number> {
    let urlGet = this.url+"/count";

    return this.http.get<number>(urlGet);
  }

  //get by user
  getPurchaseOrdersByUserId(pageNumber:number, orderBy: string, userId:number): Observable<any> {
    let urlGet = this.url+"/byUser/"+userId+"?page="+pageNumber+"&size=10"+orderBy;

    return this.http.get(urlGet);
  }

  //get by supplier
  getPurchaseOrdersBySupplierId(pageNumber:number, orderBy: string, supplierId:number): Observable<any> {
    let urlGet = this.url+"/bySupplier/"+supplierId+"?page="+pageNumber+"&size=10"+orderBy;

    return this.http.get(urlGet);
  }
    
  getPurchaseStates(): Observable<any>{
    return this.http.get(this.urlPurchaseState);
  }

  getPurchaseOrderById(id: number): Observable<PurchaseOrder>{
    const url = this.url+'/'+id;

    return new Observable<PurchaseOrder>(observer => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const purchaseOrder: PurchaseOrder = data;
          observer.next(purchaseOrder);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }
}
