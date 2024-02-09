import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../../../models/purchase-order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supplier } from '../../../models/suppliers';
import { PurchaseOrdersService } from '../../../services/purchase-orders.service';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliersService } from '../../../services/suppliers.service';
import { ProductPurchase } from '../../../models/product-po';
import { Product } from '../../../models/product';
import Swal from 'sweetalert2';
import { auto } from '@popperjs/core';

type SortOrder = 'None' | 'asc' | 'desc';

@Component({
  selector: 'app-purchase-orders-create',
  templateUrl: './purchase-orders-create.component.html',
  styleUrl: './purchase-orders-create.component.css'
})
export class PurchaseOrdersCreateComponent implements OnInit {
  edit: boolean = false;

  suppliers: Supplier[] = [];
  idParam: number = 0;
  currentPage: number = 0;
  pages:number = 1;
  maxPages: number = 5;
  nextFive: boolean = false;
  previous: boolean = false;
  searchBusinessName: string = '';
  searchSupplierCode: string = '';
  searchBusinessNameOn: boolean = false;
  searchSupplierCodeOn: boolean = false;
  selectedOption: string = '1';
  businessNameSort:SortOrder = 'None';
  searchSupplierCategoryId: number = -1;
  searchSupplierCategoryIdOn: boolean = false;

  supplierValid:boolean = false;
  productsValid:boolean = false;

  oldPurchaseOrder!:PurchaseOrder;

  purchaseOrder!:PurchaseOrder;
  supplierSavedId:number = -1;
  continueSupplier: boolean = false;

  products:Product[] = [];

  indexProductSelected:number = -1;
  productAmount: number = 0;
  alertAmountMin: boolean = false;

  productPurchase: ProductPurchase[] = [];

  constructor(
    private suppliersService: SuppliersService,
    private productsService: ProductsService,
    private purchaseOrdersService: PurchaseOrdersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.oldPurchaseOrder = this.purchaseOrdersService.inicPurchaseOrder();
    this.purchaseOrder = this.purchaseOrdersService.inicPurchaseOrder();

    this.suppliersService.getAllActiveSuppliers(0,this.getSort(),this.searchBusinessName,
    this.searchSupplierCode,this.searchSupplierCategoryId).subscribe(
      response=>{
        this.suppliers = response.content;
      }
    )

  }

  nextPage(){
    this.currentPage++;
    this.selectPage(this.currentPage);
  }

  prevPage(){
    this.currentPage--;
    this.selectPage(this.currentPage);
  }

  searchByBusinessName(){
    this.searchBusinessNameOn = true;
    this.selectPage(this.currentPage);
  }

  clearSearchByBusinessName(){
    this.searchBusinessName = '';
    this.searchBusinessNameOn = false;
    this.selectPage(this.currentPage);
  }

  searchBySupplierCode(){
    this.searchSupplierCodeOn = true;
    this.selectPage(this.currentPage);
  }

  clearSearchBySupplierCode(){
    this.searchSupplierCode = '';
    this.searchSupplierCodeOn = false;
    this.selectPage(this.currentPage);
  }

  changeSort(columnName: string){
    switch(columnName){
      case 'businessName':
        if(this.businessNameSort === 'None'){
          this.businessNameSort = 'desc';
        }else if(this.businessNameSort === 'desc'){
          this.businessNameSort = 'asc';
        }else{
          this.businessNameSort = 'None';
        }
        break;
    }
    this.selectPage(0);
  }

  getSort(){
    let sort:string = '';

    if(this.businessNameSort !== 'None'){
      sort = '&sort=businessName,'+this.businessNameSort;
    }

    return sort;
  }
  
  getPages(): number[] {
    this.pages;
    let startPage = Math.max(1, this.currentPage - Math.floor(this.maxPages / 2));
    let endPage = Math.min(this.pages, startPage + this.maxPages - 1);
  
    if(this.pages > 5){
      if(endPage-startPage != 4){
        startPage = endPage-4;
      }
    }
    let returnPages = Array.from(Array(Math.min(5, endPage - startPage + 1)), (_, i) => startPage + i);
  
    return returnPages;
  }

  selectPage(page: number){
    this.suppliersService.getAllActiveSuppliers(page,this.getSort(),this.searchBusinessName,
                            this.searchSupplierCode,this.searchSupplierCategoryId).subscribe(
            data=>{
              this.suppliers = data.content;
              this.pages = data.totalPages;
            }
            );  
  }

  selectSupplier(supplier: Supplier){
    this.purchaseOrder.supplier = supplier;
    this.supplierSavedId = supplier.id;
    this.continueSupplier = true;

    //cargo el arreglo de categorias en base a el id del rubro
    this.productsService.getAllProductsBySupplierId(supplier.id).subscribe(
      response=>{
        this.products = response;
        console.log(this.products);
      }
    )
  }

  supplierForm(){
    this.supplierValid = true;
  }

  addProduct(){
    let productPurchase: ProductPurchase = this.productToProductPurchase();
    console.log(productPurchase);
  }

  private productToProductPurchase(){
    let productPurchase: ProductPurchase = {
      code: '',
      category: '',
      name: '',
      price: 0,
      amount: 0
    }

    productPurchase.code = this.products[this.indexProductSelected].codeSKU
    productPurchase.category = this.products[this.indexProductSelected].productCategory.category;
    productPurchase.name = this.products[this.indexProductSelected].productName;
    productPurchase.amount = this.productAmount;
    productPurchase.price = this.products[this.indexProductSelected].price;

    return productPurchase;

  }
}