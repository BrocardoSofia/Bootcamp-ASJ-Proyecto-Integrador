import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../../models/suppliers';
import { SuppliersService } from '../../../services/suppliers.service';
import Swal from 'sweetalert2';

type State = 'All' | 'Active' | 'Deleted';
type SortOrder = 'None' | 'asc' | 'desc';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent implements OnInit{

  suppliers:Supplier[] = [];
  currentPage: number = 0;
  pages:number = 1;
  maxPages: number = 5;
  nextFive: boolean = false;
  previous: boolean = false;
  searchBusinessName: string = '';
  searchBusinessNameOn: boolean = false;
  searchSupplierCategoryId: number = -1;
  searchSupplierCategoryIdOn: boolean = false;
  searchSupplierCode: string = '';
  searchSupplierCodeOn: boolean = false;
  state: State = 'All';
  selectedOption: string = '1';
  businessNameSort:SortOrder = 'None';

  constructor(private suppliersService: SuppliersService){}

  ngOnInit() {
    this.suppliersService.getSuppliers().subscribe(data=>{
      this.pages = data.totalPages;
      this.suppliers = data.content;

      if(this.pages > 5){
        this.nextFive = true;
      }
    })
  }

  getSupplierState(supplier: Supplier){
    return (supplier.deletedAt !== null)?'Inactivo':'Activo';
  }

  deleteUser(supplier: Supplier){
    Swal.fire({
      title: "Eliminando al proveedor: " + supplier.businessName,
      text: "¿Esta seguro que desea eliminar al proveedor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.suppliersService.deleteSupplier(supplier).subscribe(
          deleted=>{
            Swal.fire({
              title: "¡Eliminado!",
              text: "El proveedor " + deleted.businessName + " fue eliminado correctamente",
              icon: "success"
            });
            this.selectPage(this.currentPage);
          }
        )
        
      }
    });
  }

  reInsertUser(supplier: Supplier){
    Swal.fire({
      title: "Reingresando al proveedor: " + supplier.businessName,
      text: "¿Esta seguro que desea reingresar al proveedor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reingresar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.suppliersService.reInsertSupplier(supplier).subscribe(
          deleted=>{
            Swal.fire({
              title: "¡Re ingresado!",
              text: "El proveedor " + supplier.businessName + " fue re ingresado correctamente",
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
          this.suppliersService.getAllSuppliers(page,this.getSort(),this.searchBusinessName,
                          this.searchSupplierCode,this.searchSupplierCategoryId).subscribe(
            data=>{
              this.suppliers = data.content;
              this.pages = data.totalPages;
            }
            );
          break;
        case 'Active':
          this.suppliersService.getAllActiveSuppliers(page,this.getSort(),this.searchBusinessName,
                            this.searchSupplierCode,this.searchSupplierCategoryId).subscribe(
            data=>{
              this.suppliers = data.content;
              this.pages = data.totalPages;
            }
            );
          break;
        case 'Deleted':
          this.suppliersService.getAllDeletedSuppliers(page,this.getSort(),this.searchBusinessName,
                              this.searchSupplierCode,this.searchSupplierCategoryId).subscribe(
            data=>{
              this.suppliers = data.content;
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

}
