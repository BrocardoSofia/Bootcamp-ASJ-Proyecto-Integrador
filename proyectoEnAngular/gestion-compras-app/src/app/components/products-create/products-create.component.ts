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
  supplierName!:string;

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

    this.product = this.productsService.inicProduct();

    if(this.suppliers.length === 0){
      this.existsSuppliers = false;
    }

    let codeParam;
    this.activeRoute.queryParamMap.subscribe((params) => {
      codeParam = params.get('editProduct') || null;

      if (codeParam !== null) {
        //la pagina pasa a modo edicion
        this.editProduct = true;
        this.validatedCode = true;

        //lleno los parametros con los datos del proveedor
        this.fillProductForm(codeParam);

        this.product.code = codeParam;
      }
    });

    console.log(this.suppliers);
  }

  private fillProductForm(code: string) {
    let product = this.productsService.getProductByCode(code);

    if (product !== null) {
      this.product = product;
      this.initFormEdit(product.supplier);
      this.supplierCode = this.product.supplier.code;
      this.supplierName = this.product.supplier.businessName;
    }
  }

  initForm(){
    const lettersNumbersPattern = /^[A-Za-z0-9\s]+$/;
    this.submitForm = this.fb.group({
      supplier: ['', [Validators.required]],
      category: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern(lettersNumbersPattern)]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  initFormEdit(supplier:Supplier){
    const lettersNumbersPattern = /^[A-Za-z0-9\s]+$/;
    this.submitForm = this.fb.group({
      supplier: [supplier],
      category: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern(lettersNumbersPattern)]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  verifyCode(form: FormGroup) {
    if(form.valid){
      if(this.productsService.existCode(this.product.code)){
        //si existe verifico que no este eliminado
        //en caso de estar eliminado entra en reInsertProductMode
        const product = this.productsService.getProductByCode(this.product.code);

        if(product?.deleted === true){
          this.reInsertProductMode = true;
          this.product = product;
          this.supplierCode = product.supplier.code;
          this.supplierName = product.supplier.businessName;
          this.initFormEdit(product.supplier);
        }else{
          //si el codigo existe y no es de un producto eliminado muestro un mensaje
          this.validCode = false;
        }
        
      }else{
        //si el codigo no existe paso al siguiente formulario
        this.initForm();
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
        this.modifyProduct();
      }else if(this.reInsertProductMode){
        this.reInsertProduct();
      }else{
        this.submitProduct();
      }
    }
  }

  private modifyProduct(){
    //enviarlo a la base de datos
    this.productsService.modifyProduct(this.product);

    alert('El producto ' + this.product.name + ' fue modificado'); //esto iria en el subscribe

    //lo redirijo a la ventana de productos
    this.router.navigate(['/products']);
  }

  private reInsertProduct(){
    this.productsService.reInsertProduct(this.product);

    alert('Producto ' + this.product.name + ' reingresado'); //esto iria en el subscribe

    //lo redirijo a la ventana de productos
    this.router.navigate(['/products']);
  }

  submitProduct() {
    //agrego el id al producto buscando el ultimo guardado
    this.product.id = this.productsService.getLastId()+1;
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
