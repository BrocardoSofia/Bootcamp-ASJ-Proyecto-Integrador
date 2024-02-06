import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupplierCategoriesService {
  private url: string = 'http://localhost:8080/supplier-categories';

  constructor() { }
}
