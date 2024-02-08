import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliersService } from '../../../services/suppliers.service';
import { Supplier } from '../../../models/suppliers';
import Swal from 'sweetalert2';
import { auto } from '@popperjs/core';

type SortOrder = 'None' | 'asc' | 'desc';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrl: './products-create.component.css'
})
export class ProductsCreateComponent implements OnInit{
  edit: boolean = false;

  suppliers: Supplier[] = [];
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
  productValid:boolean = false;
  imagesValid:boolean = false;

  oldSupplier!:Supplier;

  product!:Product;
  supplierSavedId:number = -1;
  continueSupplier: boolean = false;

  constructor(
    private productsService: ProductsService,
    private suppliersService: SuppliersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.suppliersService.getAllActiveSuppliers(0,this.getSort(),this.searchBusinessName,
    this.searchSupplierCode,this.searchSupplierCategoryId).subscribe(
      response=>{
        this.suppliers = response.content;
      }
    )

    this.product = this.productsService.inicProduct();
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
    this.product.supplier = supplier;
    this.supplierSavedId = supplier.id;
    this.continueSupplier = true;
  }

  supplierForm(){
    this.supplierValid = true;
  }

}
