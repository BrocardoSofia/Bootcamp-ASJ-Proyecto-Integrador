import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierCategoriesService } from '../../../services/supplier-categories.service';
import { SupplierCategory } from '../../../models/supplier-category';
import Swal from 'sweetalert2';
import { auto } from '@popperjs/core';

@Component({
  selector: 'app-new-supplier-categories',
  templateUrl: './new-supplier-categories.component.html',
  styleUrl: './new-supplier-categories.component.css'
})
export class NewSupplierCategoriesComponent implements OnInit{
  edit: boolean = false;
  submitForm!: FormGroup;
  supplierCategory!: SupplierCategory;
  oldCategory: string = '';

  constructor(private fb: FormBuilder,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private supplierCategoriesService : SupplierCategoriesService){}

  ngOnInit(): void {
    this.submitForm = this.fb.group({
      category: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });

    this.supplierCategory = this.supplierCategoriesService.inicSupplierCategory()
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
    this.supplierCategoriesService.categoryExists(this.supplierCategory.category).subscribe(
      exists => {
        if (!exists) {
          this.supplierCategoriesService.addCategory(this.supplierCategory).subscribe(
            user => {
              this.categoryLoadedSuccessfully('Se agrego correctamente la categoria: ' 
              + this.supplierCategory.category);
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
      text: 'Ya existe la categoria ' + this.supplierCategory.category + ' en el sistema',
    });

    if(this.edit){
      this.supplierCategory.category = this.oldCategory;
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
    this.router.navigate(['/supplier-categories']);
  }

  modifyCategory(){

  }
}
