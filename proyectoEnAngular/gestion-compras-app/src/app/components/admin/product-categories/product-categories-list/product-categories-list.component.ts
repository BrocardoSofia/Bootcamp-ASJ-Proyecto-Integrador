import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../../../models/product-category';
import { ProductCategoriesService } from '../../../../services/product-categories.service';
import Swal from 'sweetalert2';

type State = 'All' | 'Active' | 'Deleted';
type SortOrder = 'None' | 'asc' | 'desc';

@Component({
  selector: 'app-product-categories-list',
  templateUrl: './product-categories-list.component.html',
  styleUrl: './product-categories-list.component.css'
})
export class ProductCategoriesListComponent implements OnInit{

  productCategories:ProductCategory[] = [];
  currentPage: number = 0;
  pages:number = 1;
  maxPages: number = 5;
  nextFive: boolean = false;
  previous: boolean = false;
  searchCategory: string = '';
  searchCategoryOn: boolean = false;
  state: State = 'All';
  selectedOption: string = '1';
  categorySort:SortOrder = 'None';
  supplierCategorySort:SortOrder = 'None';
  createdAtSort:SortOrder = 'None';

  constructor(private productCategoryService: ProductCategoriesService){}

  ngOnInit(): void {
    this.productCategoryService.getProductCategories().subscribe(data=>{
      this.pages = data.totalPages;
      this.productCategories = data.content;

      if(this.pages > 5){
        this.nextFive = true;
      }
    })
  }

  getCategoryState(productCategory: ProductCategory){
    return (productCategory.deletedAt !== null)?'Inactivo':'Activo';
  }

  deleteCategory(productCategory: ProductCategory){
    Swal.fire({
      title: "Eliminando la categoria: " + productCategory.category,
      text: "¿Esta seguro que desea eliminar la categoria?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productCategoryService.deleteCategory(productCategory).subscribe(
          deleted=>{
            Swal.fire({
              title: "¡Eliminado!",
              text: "La categoria " + deleted.category + " fue eliminada correctamente",
              icon: "success"
            });
            this.selectPage(this.currentPage);
          }
        )
        
      }
    });
  }

  reInsertCategory(productCategory: ProductCategory){
    Swal.fire({
      title: "Reingresando la categoria: " + productCategory.category,
      text: "¿Esta seguro que desea reingresar la categoria?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reingresar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productCategoryService.reInsertCategory(productCategory).subscribe(
          deleted=>{
            Swal.fire({
              title: "¡Re ingresado!",
              text: "La categoria " + productCategory.category + " fue re ingresada correctamente",
              icon: "success"
            });
            this.selectPage(this.currentPage);
          }
        )
      }
    });
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
      switch(this.state){
        case 'All':
          ///VER ESTE SORT PARA EL RESTO
          this.productCategoryService.getAllCategories(page,this.getSort(),this.searchCategory).subscribe(
            data=>{
              this.productCategories = data.content;
              this.pages = data.totalPages;
            }
            );
          break;
        case 'Active':
          this.productCategoryService.getAllActiveCategories(page,this.getSort(),this.searchCategory).subscribe(
            data=>{
              this.productCategories = data.content;
              this.pages = data.totalPages;
            }
            );
          break;
        case 'Deleted':
          this.productCategoryService.getAllDeletedCategories(page,this.getSort(),this.searchCategory).subscribe(
            data=>{
              this.productCategories = data.content;
              this.pages = data.totalPages;
            }
            );
          break;
     }  
  }

  changeStatusFilter(){
    switch(this.selectedOption){
      case '1':
        this.state = 'All';
        break;
      case '2':
        this.state = 'Active';
        break;
      case '3':
        this.state = 'Deleted';
        break;
    }
    this.selectPage(this.currentPage);
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
      case 'supplierCategory': 
        if(this.supplierCategorySort === 'None'){
          this.createdAtSort = 'desc';
        }else if(this.supplierCategorySort === 'desc'){
          this.createdAtSort = 'asc';
        }else{
          this.supplierCategorySort = 'None';
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

    if(this.supplierCategorySort !== 'None'){
      sort += '&sort=supplierCategory,'+this.createdAtSort;
    }

    return sort;
  }
}
