import { Injectable } from '@angular/core';
import { Supplier } from '../models/suppliers';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IvaCondition } from '../models/ivaCondition';
import { Country } from '../models/country';
import { SupplierContact } from '../models/supplierContact';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  private url: string = 'http://localhost:8080/suppliers';
  private urlIvaContitions: string = 'http://localhost:8080/iva-conditions';
  private urlCountries: string = 'http://localhost:8080/countries';
  private urlSupplierContact: string = 'http://localhost:8080/suppliers-contacts';
  private urlSupplierHistory: string = 'http://localhost:8080/supplier-history';
  
  constructor(private http: HttpClient,
              private loginService: LoginService) { }

  /*Inicializa un proveedor con datos en vacio*/
  public inicSupplier(){
    let supplier:Supplier = {
      id: 0,
      supplierCategory: {
        id: 0,
        category: '',
        createdAt: new Date,
        updatedAt: null,
        deletedAt: null,
        products: []
      },
      createdBy: {
        id: 0,
        userAlias: '',
        password: '',
        createdAt: new Date,
        updatedAt: null,
        deletedAt: null
      },
      province: {
        id: 0,
        province: '',
        country: {
          id: 0,
          country: '',
          createdAt: new Date,
          provinces: []
        },
        createdAt: new Date
      },
      ivaCondition: {
        id: 0,
        ivaCondition: '',
        createdAt: new Date
      },
      supplierCode: '',
      businessName: '',
      imageUrl: '',
      businessWebpage: '',
      businessEmail: '',
      businessPhone:'',
      streetName: '',
      streetNumber: 0,
      city: '',
      cp: '',
      cuit: '',
      supplierContacts: [],
      createdAt: new Date,
      updatedAt: null,
      deletedAt: null
    }

    return supplier;
  }

  //get all suppliers filtered
  getAllSupplierHistory(pageNumber:number, orderBy: string, userId: number): Observable<any> {
    let urlGet = this.urlSupplierHistory + '/user/' + userId +
                  "?page="+pageNumber+"&size=10"+orderBy;

    return this.http.get(urlGet);
  }

  getAllSupplierActions(pageNumber:number, orderBy: string, userId: number): Observable<any> {
    let urlGet = this.urlSupplierHistory + '/user/' + userId + '/actions'+
                  "?page="+pageNumber+"&size=10"+orderBy;

    return this.http.get(urlGet);
  }
  
  public addSupplier(supplier: Supplier): Observable<Supplier> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<Supplier>(this.url, supplier, { headers });
  }

  public updateSupplier(supplier: Supplier): Observable<Supplier> {
    const headers = { 'Content-Type': 'application/json' };
    const url = this.url + "/" + this.loginService.getUserId();
    return this.http.put<Supplier>(url, supplier, { headers });
  }

  public businessNameExists(businessName: string): Observable<boolean> {
    let exist = false;
    const url = this.url + "/businessNameExists/" + businessName;

    return this.http.get<boolean>(url);
  }

  public supplierCodeExists(supplierCode: string): Observable<boolean> {
    let exist = false;
    const url = this.url + "/supplierCodeExists/" + supplierCode;

    return this.http.get<boolean>(url);
  }

  public deleteSupplier(supplier: Supplier): Observable<Supplier> {
    const url = this.url + "/" + supplier.id + "/" + this.loginService.getUserId();

    return this.http.delete<Supplier>(url);
  }

  public reInsertSupplier(supplier: Supplier): Observable<boolean> {
    const url = this.url + "/" + supplier.id + "/reInsert"+ "/" + this.loginService.getUserId();;

    return this.http.delete<boolean>(url);
  }

  getSuppliers(): Observable<any> {
    const params = {
      page: '0',
      size: '10'
    };

    return this.http.get(this.url, { params });
  }

  //get all suppliers filtered
  getAllSuppliers(pageNumber:number, orderBy: string, businessName: string,
                  supplierCode: string, supplierCategoryId: number): Observable<any> {
    let urlGet = this.url+"?page="+pageNumber+"&size=10"+orderBy+"&businessName="+businessName
                  +"&supplierCode="+supplierCode+"&supplierCategoryId="+supplierCategoryId;

    return this.http.get(urlGet);
  }

  //get active suppliers filtered
  getAllActiveSuppliers(pageNumber:number, orderBy: string, businessName: string,
                    supplierCode: string, supplierCategoryId: number): Observable<any> {
    let urlGet = this.url+"/active"+"?page="+pageNumber+"&size=10"+orderBy
                  +"&businessName="+businessName +"&supplierCode="+supplierCode
                  +"&supplierCategoryId="+supplierCategoryId;

    return this.http.get(urlGet);
  }

  //get deketed suppliers filtered
  getAllDeletedSuppliers(pageNumber:number, orderBy: string, businessName: string,
                      supplierCode: string, supplierCategoryId: number): Observable<any> {
    let urlGet = this.url+"/deleted"+"?page="+pageNumber+"&size=10"+orderBy
                  +"&businessName="+businessName +"&supplierCode="+supplierCode
                  +"&supplierCategoryId="+supplierCategoryId;

    return this.http.get(urlGet);
  }

  getSupplierById(id: number): Observable<Supplier>{
    const url = this.url+'/'+id;

    return new Observable<Supplier>(observer => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const supplier: Supplier = data;
          observer.next(supplier);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  getAllIvaConditions(): Observable<IvaCondition[]> {
    return this.http.get<IvaCondition[]>(this.urlIvaContitions);
  }

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.urlCountries);
  }
  
  public addSupplierContact(supplierContact: SupplierContact): Observable<SupplierContact> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<SupplierContact>(this.urlSupplierContact, supplierContact, { headers });
  }

  public deleteSupplierContact(supplierContactId: number): Observable<SupplierContact> {
    return this.http.delete<SupplierContact>(this.urlSupplierContact+"/"+supplierContactId);
  }
}