import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrl: './products-create.component.css'
})
export class ProductsCreateComponent implements OnInit{
  product!: Product;
  codeForm!: FormGroup;
  submitForm!: FormGroup;

  validatedCode: boolean = false;
  validatedProduct: boolean = false;
  editProduct: boolean = false;
  reInsertProductMode: boolean = false;

  validCode: boolean = true;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    const lettersNumbersPattern = /^[A-Za-z0-9]+$/;

    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(lettersNumbersPattern)]]
    });

    this.product = this.productsService.inicProduct();
  }

  verifyCode(form: FormGroup) {
    if(form.valid){
      if(this.productsService.existCode(this.product.code)){
        //si el codigo existe muestro un mensaje
        this.validCode = false;
      }else{
        //si el codigo no existe paso al siguiente formulario
        this.validatedCode = true;
      }
    }
          
  }

}
