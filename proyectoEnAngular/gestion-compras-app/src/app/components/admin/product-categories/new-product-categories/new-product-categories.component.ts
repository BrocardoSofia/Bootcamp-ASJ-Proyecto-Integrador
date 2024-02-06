import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductCategory } from '../../../../models/product-category';
import { SupplierCategory } from '../../../../models/supplier-category';
import { SupplierCategoriesService } from '../../../../services/supplier-categories.service';
import { ProductCategoriesService } from '../../../../services/product-categories.service';

type SortOrder = 'None' | 'asc' | 'desc';

@Component({
  selector: 'app-new-product-categories',
  templateUrl: './new-product-categories.component.html',
  styleUrl: './new-product-categories.component.css'
})
export class NewProductCategoriesComponent implements OnInit{
  edit: boolean = false;
  submitForm!: FormGroup;
  productCategory!: ProductCategory;
  oldCategory: string = '';
  idParam: number = 0;

  suplierCategories:SupplierCategory[] = [];
  currentPage: number = 0;
  pages:number = 1;
  maxPages: number = 5;
  nextFive: boolean = false;
  previous: boolean = false;
  searchCategory: string = '';
  searchCategoryOn: boolean = false;
  selectedOption: string = '1';
  categorySort:SortOrder = 'None';
  createdAtSort:SortOrder = 'None';

  continue: boolean = false;
  supplierCategorySaved!: SupplierCategory;
  supplierCategorySavedId: number = 0;

  supplierCategorySelected: boolean = false;

  constructor(private supplierCategoryService: SupplierCategoriesService,
              private productCategoryService: ProductCategoriesService){}

  ngOnInit(): void {
    this.supplierCategoryService.getAllActiveCategories(0,this.getSort(),this.searchCategory).subscribe(
      data=>{
        this.pages = data.totalPages;
        this.suplierCategories = data.content;

        if(this.pages > 5){
          this.nextFive = true;
        }
    })
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
    this.currentPage = page;
    this.supplierCategoryService.getAllActiveCategories(page,this.getSort(),this.searchCategory).subscribe(
      data=>{
        this.suplierCategories = data.content;
        this.pages = data.totalPages;
      }
      ); 
  }

  nextPage(){
    this.currentPage++;
    this.selectPage(this.currentPage);
  }

  prevPage(){
    this.currentPage--;
    this.selectPage(this.currentPage);
  }

  searchByCategory(){
    this.searchCategoryOn = true;
    this.selectPage(this.currentPage);
  }

  clearSearchByCategory(){
    this.searchCategory = '';
    this.searchCategoryOn = false;
    this.selectPage(this.currentPage);
  }

  changeSort(columnName: string){
    switch(columnName){
      case 'category':
        if(this.categorySort === 'None'){
          this.categorySort = 'desc';
        }else if(this.categorySort === 'desc'){
          this.categorySort = 'asc';
        }else{
          this.categorySort = 'None';
        }
        break;
      case 'createdAt':
        if(this.createdAtSort === 'None'){
          this.createdAtSort = 'desc';
        }else if(this.createdAtSort === 'desc'){
          this.createdAtSort = 'asc';
        }else{
          this.createdAtSort = 'None';
        }
        break;
    }
    this.selectPage(0);
  }

  getSort(){
    let sort:string = '';

    if(this.categorySort !== 'None'){
      sort = '&sort=category,'+this.categorySort;
    }

    if(this.createdAtSort !== 'None'){
      sort += '&sort=createdAt,'+this.createdAtSort;
    }

    return sort;
  }

  selectSupplierCategory(supplierCategory: SupplierCategory){
    this.supplierCategorySaved = supplierCategory;
    this.supplierCategorySavedId = supplierCategory.id;
    this.continue = true;
  }

  continueForm(){
    this.supplierCategorySelected = true;
  }
}
