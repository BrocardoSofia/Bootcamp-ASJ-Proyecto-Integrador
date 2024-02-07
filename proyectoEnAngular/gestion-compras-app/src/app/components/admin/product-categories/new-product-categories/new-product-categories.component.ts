import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCategory } from '../../../../models/product-category';
import { SupplierCategory } from '../../../../models/supplier-category';
import { SupplierCategoriesService } from '../../../../services/supplier-categories.service';
import { ProductCategoriesService } from '../../../../services/product-categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { auto } from '@popperjs/core';

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

  constructor(private fb: FormBuilder,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private supplierCategoryService: SupplierCategoriesService,
              private productCategoryService: ProductCategoriesService){}

  ngOnInit(): void {
    this.submitForm = this.fb.group({
      category: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });

    this.productCategory = this.productCategoryService.inicProductCategory();

    this.supplierCategoryService.getAllActiveCategories(0,this.getSort(),this.searchCategory).subscribe(
      data=>{
        this.pages = data.totalPages;
        this.suplierCategories = data.content;

        if(this.pages > 5){
          this.nextFive = true;
        }
    });

    this.activeRoute.queryParamMap.subscribe((params) => {
      let param = params.get('productCategory') || null;

      if (param !== null) {
        this.idParam = parseInt(param);

        this.productCategoryService.getCategoryById(this.idParam).subscribe(response => {

          if(response !== null){
            this.productCategory = response;
            this.edit = true;
            this.oldCategory = this.productCategory.category;
          }else{
            //lo redirijo a la pagina anterior
            this.router.navigate(['/product-categories']);
          }
          
        });
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
    this.productCategory.supplierCategory = this.supplierCategorySaved;
  }

  submitCategory(){
    if(!this.edit){
      //si no estoy en modo edicion se agrega un nuevo usuario
      this.createCategory();
    }else{
      //si estamos en modo edicion se debe modificar el usuario
      this.modifyCategory();
    }
  }

  createCategory(){
    //valido si el usuario existe
    this.productCategoryService.categoryExists(this.productCategory.category, this.supplierCategorySaved.id).subscribe(
      exists => {
        if (!exists) {
          this.productCategoryService.addCategory(this.productCategory).subscribe(
            user => {
              this.categoryLoadedSuccessfully('Se agrego correctamente la categoria: ' 
              + this.productCategory.category);
            }
          );
        } else {
          this.alertCategoryExist()
        }
      }
    );
  }

  private alertCategoryExist(){
    //si existe informo con un alert que el usuario ya esta registrado
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: 'Ya existe la categoria ' + this.productCategory.category + ' en el sistema',
    });

    if(this.edit){
      this.productCategory.category = this.oldCategory;
    }else{
      this.submitForm.reset();
    }
    
  }

  private categoryLoadedSuccessfully(textInfo: string){
    //muestro en un alert que se agrego correctamente el usuario
    Swal.fire({
      text: textInfo,
      imageUrl: "./assets/succesImg.jpg",
      imageWidth: 400,
      imageHeight: auto,
      imageAlt: "Custom image"
    });
  
    //lo redirijo a la pagina anterior
    this.router.navigate(['/product-categories']);
  }

  modifyCategory(){
    if(this.productCategory.category === this.oldCategory){
      //si el nombre de usuario coincide con el viejo no lo valido, ya lo modifico
      this.productCategoryService.updateCategory(this.productCategory).subscribe(
        data => {
          this.categoryLoadedSuccessfully('Se modifico correctamente la categoria: ' 
          + this.productCategory.category);
        }
      )
      
    }else{
      //si el nombre de usuario cambio debo verificar que no exista
      this.productCategoryService.categoryExists(this.productCategory.category, this.supplierCategorySaved.id).subscribe(
        exists => {
          if (!exists) {
            this.productCategoryService.updateCategory(this.productCategory).subscribe(
              data => {
                this.categoryLoadedSuccessfully('Se modifico correctamente la categoria: ' 
                + this.productCategory.category);
              }
            )            
          } else {
            this.alertCategoryExist()
          }
        }
      );
    }
  }
}
