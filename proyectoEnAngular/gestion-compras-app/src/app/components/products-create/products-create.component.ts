import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrl: './products-create.component.css'
})
export class ProductsCreateComponent {
  product!: Product;
  codeForm!: FormGroup;
  submitForm!: FormGroup;

  validatedCode: boolean = false;
  validatedProduct: boolean = false;
  editProduct: boolean = false;
  reInsertProductMode: boolean = false;

  validCode: boolean = true;

}
