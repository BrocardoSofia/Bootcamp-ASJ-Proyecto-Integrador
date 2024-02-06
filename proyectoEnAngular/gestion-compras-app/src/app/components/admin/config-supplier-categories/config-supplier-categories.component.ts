import { Component } from '@angular/core';
import { SupplierCategory } from '../../../models/supplier-category';
import { SupplierCategoriesService } from '../../../services/supplier-categories.service';
import Swal from 'sweetalert2';

type State = 'All' | 'Active' | 'Deleted';
type SortOrder = 'None' | 'asc' | 'desc';

@Component({
  selector: 'app-config-supplier-categories',
  templateUrl: './config-supplier-categories.component.html',
  styleUrl: './config-supplier-categories.component.css'
})
export class ConfigSupplierCategoriesComponent {

  suplierCategories:SupplierCategory[] = [];
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
  createdAtSort:SortOrder = 'None';

  constructor(private supplierCategoryService: SupplierCategoriesService){}

  ngOnInit(): void {
    this.supplierCategoryService.getSupplierCategories().subscribe(data=>{
      this.pages = data.totalPages;
      this.suplierCategories = data.content;

      if(this.pages > 5){
        this.nextFive = true;
      }
    })
  }

  getCategoryState(suplierCategory: SupplierCategory){
    return (suplierCategory.deletedAt !== null)?'Inactivo':'Activo';
  }

  deleteUser(suplierCategory: SupplierCategory){
    Swal.fire({
      title: "Eliminando la categoria: " + suplierCategory.category,
      text: "¿Esta seguro que desea eliminar la categoria?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.supplierCategoryService.deleteCategory(suplierCategory).subscribe(
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

  reInsertUser(suplierCategory: SupplierCategory){
    Swal.fire({
      title: "Reingresando la categoria: " + suplierCategory.category,
      text: "¿Esta seguro que desea reingresar la categoria?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reingresar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.supplierCategoryService.reInsertCategory(suplierCategory).subscribe(
          deleted=>{
            Swal.fire({
              title: "¡Re ingresado!",
              text: "La categoria " + deleted.category + " fue re ingresada correctamente",
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
          this.supplierCategoryService.getAllCategories(page,this.getSort(),this.searchCategory).subscribe(
            data=>{
              this.suplierCategories = data.content;
              this.pages = data.totalPages;
            }
            );
          break;
        case 'Active':
          this.supplierCategoryService.getAllActiveCategories(page,this.getSort(),this.searchCategory).subscribe(
            data=>{
              this.suplierCategories = data.content;
              this.pages = data.totalPages;
            }
            );
          break;
        case 'Deleted':
          this.supplierCategoryService.getAllDeletedCategories(page,this.getSort(),this.searchCategory).subscribe(
            data=>{
              this.suplierCategories = data.content;
              this.pages = data.totalPages;
            }
            );
          break;
     }  
  }

  getSort(){
    let sort:string = '';

    if(this.categorySort !== 'None'){
      sort = '&sort=userAlias,'+this.categorySort;
    }

    if(this.createdAtSort !== 'None'){
      sort += '&sort=createdAt,'+this.createdAtSort;
    }

    return sort;
  }
}
