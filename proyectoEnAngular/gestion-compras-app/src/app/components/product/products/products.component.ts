import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductsService } from '../../../services/products.service';
import Swal from 'sweetalert2';
import { ProductCategory } from '../../../models/product-category';
import { SupplierCategory } from '../../../models/supplier-category';
import { SupplierCategoriesService } from '../../../services/supplier-categories.service';

type State = 'All' | 'Active' | 'Deleted';
type SortOrder = 'None' | 'asc' | 'desc';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products:Product[] = [];
  currentPage: number = 0;
  pages:number = 1;
  maxPages: number = 5;
  nextFive: boolean = false;
  previous: boolean = false;
  searchProductName: string = '';
  searchProductNameOn: boolean = false;
  searchProductDescription: string = '';
  searchProductDescriptionOn: boolean = false;
  searchSKU: string = '';
  searchSKUOn: boolean = false;

  searchProductCategory: number = 0;

  state: State = 'Active';
  selectedOption: string = '2';

  priceSort:SortOrder = 'None';
  productNameSort:SortOrder = 'None';

  supplierCategories: SupplierCategory[] = [];
  productCategories: ProductCategory[] = [];

  constructor(private productsService: ProductsService,
              private supplierCategoriesService: SupplierCategoriesService){}

  ngOnInit() {
    //obtengo los rubros
    this.supplierCategoriesService.getSupplierCategories().subscribe(
      response=>{
        let supplierCategoriesResponse: SupplierCategory[] = response;
        //filtro solo los rubros que tengan categorias de productos
        this.supplierCategories = supplierCategoriesResponse.filter(category=> category.products.length !== 0);
      }
    )

    //obtengo los primeros productos activos
    this.productsService.getAllActiveProducts(0, '', '','','',0).subscribe(
      response=>{
        this.pages = response.totalPages;
        this.products = response.content;

        if(this.pages > 5){
          this.nextFive = true;
        }
      }
    )
  }

  getProductState(product: Product){
    return (product.deletedAt !== null)?'Inactivo':'Activo';
  }

  deleteProduct(product: Product){
    Swal.fire({
      title: "Eliminando el producto: " + product.productName,
      text: "¿Esta seguro que desea eliminar el producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.deleteProduct(product).subscribe(
          deleted=>{
            Swal.fire({
              title: "¡Eliminado!",
              text: "El producto " + product.productName + " fue eliminado correctamente",
              icon: "success"
            });
            this.selectPage(this.currentPage);
          }
        )
        
      }
    });
  }  

  reInsertSupplier(product: Product){
    Swal.fire({
      title: "Reingresando el producto: " + product.productName,
      text: "¿Esta seguro que desea reingresar el producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reingresar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.reInsertProduct(product).subscribe(
          deleted=>{
            Swal.fire({
              title: "¡Re ingresado!",
              text: "El producto " + product.productName + " fue re ingresado correctamente",
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
          this.productsService.getAllProducts(page,this.getSort(), this.searchProductDescription,
          this.searchProductName, this.searchSKU, this.searchProductCategory).subscribe(
            data=>{
              this.products = data.content;
              this.pages = data.totalPages;
            }
            );
          break;
        case 'Active':
          this.productsService.getAllActiveProducts(page,this.getSort(), this.searchProductDescription,
                          this.searchProductName, this.searchSKU, this.searchProductCategory).subscribe(
            data=>{
              this.products = data.content;
              this.pages = data.totalPages;
            }
            );
          break;
        case 'Deleted':
          this.productsService.getAllDeletedProducts(page,this.getSort(), this.searchProductDescription,
                            this.searchProductName, this.searchSKU, this.searchProductCategory).subscribe(
            data=>{
              this.products = data.content;
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

  searchByProductDescription(){
    this.searchProductDescriptionOn = true;
    this.selectPage(this.currentPage);
  }

  clearSearchByProductDescription(){
    this.searchProductDescription = '';
    this.searchProductDescriptionOn = false;
    this.selectPage(this.currentPage);
  }

  searchByProductName(){
    this.searchProductNameOn = true;
    this.selectPage(this.currentPage);
  }

  clearSearchByProductName(){
    this.searchProductName = '';
    this.searchProductNameOn = false;
    this.selectPage(this.currentPage);
  }

  searchBySKU(){
    this.searchSKUOn = true;
    this.selectPage(this.currentPage);
  }

  clearSearchBySKU(){
    this.searchSKU = '';
    this.searchSKUOn = false;
    this.selectPage(this.currentPage);
  }

  searchByProductCategory(){
    this.selectPage(this.currentPage);
  }
  
  changeSort(columnName: string){
    switch(columnName){
      case 'businessName':
        if(this.priceSort === 'None'){
          this.priceSort = 'desc';
        }else if(this.priceSort === 'desc'){
          this.priceSort = 'asc';
        }else{
          this.priceSort = 'None';
        }
        break;
      case 'productName':
        if(this.productNameSort === 'None'){
          this.productNameSort = 'desc';
        }else if(this.productNameSort === 'desc'){
          this.productNameSort = 'asc';
        }else{
          this.productNameSort = 'None';
        }
        break;
    }
    this.selectPage(0);
  }

  getSort(){
    let sort:string = '';

    if(this.priceSort !== 'None'){
      sort = '&sort=price,'+this.priceSort;
    }

    if(this.productNameSort!== 'None'){
      sort = '&sort=productName,'+this.productNameSort;
    }
    return sort;
  }

}
