import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../../models/suppliers';
import { SuppliersService } from '../../../services/suppliers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { auto } from '@popperjs/core';
import { SupplierCategory } from '../../../models/supplier-category';
import { SupplierCategoriesService } from '../../../services/supplier-categories.service';
import { IvaCondition } from '../../../models/ivaCondition';
import { LoginService } from '../../../services/login.service';
import { Country } from '../../../models/country';
import { Province } from '../../../models/province';

type SortOrder = 'None' | 'asc' | 'desc';

@Component({
  selector: 'app-suppliers-create',
  templateUrl: './suppliers-create.component.html',
  styleUrl: './suppliers-create.component.css',
})
export class SuppliersCreateComponent implements OnInit {
  supplierCodeValid:boolean = false;
  supplierCategoryValid:boolean = false;
  taxDadaValid:boolean = false;
  logoValid:boolean = false;
  locationValid:boolean = false;
  businessInfoValid:boolean = false;

  supplier!: Supplier;
  edit: boolean = false;
  idParam: number = 0;
  oldBusinessName!: string;
  oldSupplierCode!: string;

  codeForm!: FormGroup;
  taxDataForm!: FormGroup;
  logoForm!: FormGroup;
  locationForm!: FormGroup;
  submitForm!: FormGroup;

  supplierCategories!:SupplierCategory[];

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

  supplierCategorySavedId:number = -1;
  continueSupplierCategory: boolean = false;

  ivaConditions: IvaCondition[] = [];
  ivaConditionSelected!: number;

  countries: Country[] = [];
  provinces: Province[] = [];

  constructor(
    private suppliersService: SuppliersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private supplierCategoryService: SupplierCategoriesService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const imagePattern = /\.(jpg|png)$/i;
    this.supplier = this.suppliersService.inicSupplier();
    this.supplier.createdBy.id = this.loginService.getUserId();

    this.supplierCategoryService.getAllActiveCategories(0,this.getSort(),this.searchCategory).subscribe(
      data=>{
        this.pages = data.totalPages;
        this.suplierCategories = data.content;

        if(this.pages > 5){
          this.nextFive = true;
        }
    });

    this.codeForm = this.fb.group({
      businessName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      supplierCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    });

    this.taxDataForm = this.fb.group({
      ivaCondition: ['', [Validators.required]],
      cuit: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13),
                  Validators.pattern(/^\d{2}-\d{8}-\d{1}$/)]],
    });

    this.logoForm = this.fb.group({
      imageUrl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1500),
                      Validators.pattern(imagePattern)]]
    });

    this.locationForm = this.fb.group({
      province: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      cp: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      streetName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      streetNumber: ['', [Validators.required]]
    });

    this.suppliersService.getIvaConditions().subscribe(
      response=>{
        this.ivaConditions = response;
      }
    )
  }

  submitSupplierCodeAndBusinessName(){
    if(this.edit){
      this.modifySupplierCode();
    }else{
      this.createSupplierCode();
    }
  }

  submitTaxData(){
    this.taxDadaValid = true;
  }

  submitImageUrl(){
    this.logoValid = true;
  }

  submitLocation(){
    this.locationValid = true;
  }

  createSupplierCode(){
    //verifico que la razon social sea valida
    this.suppliersService.businessNameExists(this.supplier.businessName).subscribe(
      response=>{
        if(!response){
          //verifico que el codigo de proveedor sea valido
          this.suppliersService.supplierCodeExists(this.supplier.supplierCode).subscribe(
            codeResponse=>{
              if(!codeResponse){
                this.supplierCodeValid = true;
              }else{
                //informo que la razon social ya esta en el sistema
                this.alertFieldExist('Ya existe el codigo ' + this.supplier.supplierCode + ' en el sistema');
                if(this.edit){
                  this.supplier.supplierCode = this.oldSupplierCode;
                }else{
                  this.submitForm.reset();
                }
              }
            }
          )
        }else{
          //informo que la razon social ya esta en el sistema
          this.alertFieldExist('Ya existe el proveedor ' + this.supplier.businessName + ' en el sistema');
          if(this.edit){
            this.supplier.businessName = this.oldBusinessName;
          }else{
            this.submitForm.reset();
          }
        }
      }
    )
    
    
  }

  modifySupplierCode(){

  }

  private alertFieldExist(infoText: string){
    //si existe informo con un alert que el usuario ya esta registrado
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: infoText,
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
    this.supplier.supplierCategory = supplierCategory;
    this.supplierCategorySavedId = supplierCategory.id;
    this.continueSupplierCategory = true;
  }

  continueForm(){
    this.supplierCategoryValid = true;
  }
}

function cuitValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const cuitPattern = /^(\d{2})-(\d{8})-(\d{1})$/;
    const isValid = cuitPattern.test(control.value);

    return isValid ? null : { invalidCuitFormat: true };
  };
}