import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliersService } from '../../services/suppliers.service';
import { Supplier } from '../../models/suppliers';

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
  suppliers!: Supplier[];
  existsSuppliers: boolean = true;

  supplierCode!:number;

  constructor(
    private productsService: ProductsService,
    private suppliersService: SuppliersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    const lettersNumbersPattern = /^[A-Za-z0-9\s]+$/;
    this.suppliers = this.suppliersService.getSuppliers();

    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(lettersNumbersPattern)]]
    });

    this.submitForm = this.fb.group({
      supplier: ['', [Validators.required]],
      category: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern(lettersNumbersPattern)]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0.01)]],
    });

    this.product = this.productsService.inicProduct();

    if(this.suppliers.length === 0){
      this.existsSuppliers = false;
    }

    console.log(this.suppliers);
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

  onSubmit(form: FormGroup) {
    console.log("Formulario valido: "+form.valid);
    if(form.valid){
      //si el formulario es valido guardo agrego el proveedor o lo guardo depende en cual modo estoy
      this.validatedProduct = true;

      if(this.editProduct){
        //this.modifySupplier();
      }else if(this.reInsertProductMode){
        //this.reInsertSupplier();
      }else{
        this.submitSupplier();
      }
    }
  }

  submitSupplier() {
    //agrego el id al producto buscando el ultimo guardado
    this.product.id = this.productsService.getLastCode()+1;
    let supplier = this.suppliersService.getSupplier(this.supplierCode);

    if(supplier !== null){
      this.product.supplier = supplier;
    }

    //enviarlo a la base de datos
    this.productsService.addProduct(this.product);

    alert('Producto ' + this.product.name + ' agregado'); //esto iria en el subscribe

    //lo redirijo a la ventana de proveedores
    this.router.navigate(['/products']);
  }

}
