import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliersService } from '../../../services/suppliers.service';
import { Supplier } from '../../../models/suppliers';
import Swal from 'sweetalert2';
import { auto } from '@popperjs/core';
import { ProductCategory } from '../../../models/product-category';
import { ProductImage } from '../../../models/product-image';
import { LoginService } from '../../../services/login.service';

type SortOrder = 'None' | 'asc' | 'desc';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrl: './products-create.component.css'
})
export class ProductsCreateComponent implements OnInit{
  edit: boolean = false;

  suppliers: Supplier[] = [];
  idParam: number = 0;
  currentPage: number = 0;
  pages:number = 1;
  maxPages: number = 5;
  nextFive: boolean = false;
  previous: boolean = false;
  searchBusinessName: string = '';
  searchSupplierCode: string = '';
  searchBusinessNameOn: boolean = false;
  searchSupplierCodeOn: boolean = false;
  selectedOption: string = '1';
  businessNameSort:SortOrder = 'None';
  searchSupplierCategoryId: number = -1;
  searchSupplierCategoryIdOn: boolean = false;

  supplierValid:boolean = false;
  productValid:boolean = false;
  imagesValid:boolean = false;

  oldSupplier!:Supplier;

  product!:Product;
  supplierSavedId:number = -1;
  continueSupplier: boolean = false;

  productForm!: FormGroup;

  productCategories: ProductCategory[] = [];
  productCategorySelected: boolean = false;

  oldProduct!: Product;

  oldProductImages: ProductImage[] = [];
  imageForm!: FormGroup;
  images: string[] = []
  newImage: string = '';

  constructor(
    private productsService: ProductsService,
    private suppliersService: SuppliersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private loginService: LoginService
  ){}

  ngOnInit(): void {
    this.suppliersService.getAllActiveSuppliers(0,this.getSort(),this.searchBusinessName,
    this.searchSupplierCode,this.searchSupplierCategoryId).subscribe(
      response=>{
        this.suppliers = response.content;
      }
    )

    this.product = this.productsService.inicProduct();
    this.oldProduct = this.productsService.inicProduct();
    this.product.createdBy.id = this.loginService.getUserId();

    this.productForm = this.fb.group({
      productCategory: ['', [Validators.required]],
      codeSKU: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productDescription: ['', [Validators.minLength(0), Validators.maxLength(150)]],
      price: ['',[Validators.required,Validators.min(1)]]
    });

    this.imageForm = this.fb.group({
      imageUrl: this.fb.array([]) // Crea un FormArray para las imagenes
    });

    //veo si estoy en modo edicion
    this.activeRoute.queryParamMap.subscribe((params) => {
      let param = params.get('product') || null;

      if (param !== null) {
        this.idParam = parseInt(param);

        this.productsService.getProductById(this.idParam).subscribe(response => {

          if(response !== null){
            this.product = response;
            this.edit = true;
            this.oldProduct = response;
            for(let image of this.product.productImages){
              this.images.push(image.imageURL);
            }
          }else{
            //lo redirijo a la pagina anterior
            this.router.navigate(['/users']);
          }
          
        });
      }
    });
  }

  addImage() {
    if (this.newImage && (this.newImage.endsWith('.png') || this.newImage.endsWith('.jpg'))) {
      this.images.push(this.newImage);
      this.newImage = ''; // Limpiar el campo de entrada
      if(this.edit){
        //si estoy en modo edicion a medida que agrego imagenes las cargo en la base de datos
        let productImage: ProductImage = {
          id: 0,
          imageURL: this.images[this.images.length-1],
          product: this.product
        }

        this.productsService.addProductImage(productImage).subscribe(
          response=>{
            this.product.productImages.push(response);
          }
        );
      }
    }
  }

  removeImage(image: string) {
    const index = this.images.indexOf(image);
    if(!this.edit) {
      this.images.splice(index, 1);
    }else{
      if(this.edit){
        //si estoy en modo edicion se elimina, pero le pregunto
        Swal.fire({
          title: "¿Esta seguro que desea eliminar la imagen?",
          text: "El cambio no se puede revertir",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar"
        }).then((result) => {
          if (result.isConfirmed) {
            //busco el productImage
            const getImage: ProductImage[] = this.product.productImages.filter(data=>data.imageURL == image);
            if(getImage.length !== 0){
              this.productsService.deleteProductImage(getImage[0]).subscribe(
                response=>{
                  this.images.splice(index, 1);
                  Swal.fire({
                    title: "¡Eliminado!",
                    text: "La imagen fue eliminada",
                    icon: "success"
                  });
                }
              )
            }
            
          }
        });
      }
    }
  }

  onSubmit(): void {
    if(!this.edit){
      this.createProduct();
      //console.log(this.product)
    }else{
      this.modifyProduct();
    }

  }

  createProduct(){
    this.productsService.addProduct(this.product).subscribe(
      response=>{
        if(response !== null){
          //luego de agregar el nuevo producto agrego las imagenes
          this.callProductImagesSequentially(response);

          //mensaje de que se agrego todo correctamente y lo envio a la pagina anterior
          this.productLoadedSuccessfully('Se agrego correctamente el producto: ' + this.product.productName);
        }
      }
    )
  }

  changeImage(event: Event): void {
    const imagen = event.target as HTMLImageElement;
    imagen.src = '/assets/imageNotFound.jpg';
  }

  private productLoadedSuccessfully(textInfo: string){
    //muestro en un alert que se agrego correctamente el usuario
    Swal.fire({
      text: textInfo,
      imageUrl: "./assets/succesImg.jpg",
      imageWidth: 400,
      imageHeight: auto,
      imageAlt: "Custom image"
    });
  
    //lo redirijo a la pagina anterior
    this.router.navigate(['/products']);
  }

  async callProductImagesSequentially(productAdded: Product) {
    for (const image of this.images) {
      let productImage: ProductImage = {
        id: 0,
        imageURL: image,
        product: productAdded
      }

      try {
          await this.productsService.addProductImage(productImage).toPromise();
      } catch (error) {
          console.error('Error al agregar la imagen:', error);
      }
    }
  }

  modifyProduct(){
    this.productsService.updateProduct(this.product).subscribe(
      response=>{
        if(response !== null){
          //mensaje de que se modifico todo correctamente y lo envio a la pagina anterior
          this.productLoadedSuccessfully('Se modifico correctamente el producto: ' + this.product.productName);
        }
      }
    )
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
    this.suppliersService.getAllActiveSuppliers(page,this.getSort(),this.searchBusinessName,
                            this.searchSupplierCode,this.searchSupplierCategoryId).subscribe(
            data=>{
              this.suppliers = data.content;
              this.pages = data.totalPages;
            }
            );  
  }

  selectSupplier(supplier: Supplier){
    this.product.supplier = supplier;
    this.supplierSavedId = supplier.id;
    this.continueSupplier = true;

    //cargo el arreglo de categorias en base a el id del rubro
    this.productCategories = supplier.supplierCategory.products;
  }

  supplierForm(){
    this.supplierValid = true;
  }

  submitProductForm(){
    //validar que el sku no exista
    if(!this.edit || this.product.supplier.id !== this.oldProduct.supplier.id){
      this.productsService.codeSkuExists(this.product.codeSKU).subscribe(
        response=>{
          if(!response){
            this.productValid = true;
          }else{
            this.alertFieldExist('Ya existe el sku ' + this.product.codeSKU + ' en el sistema');
            if(this.edit){
              this.product.codeSKU = this.oldProduct.codeSKU;
            }else{
              this.product.codeSKU = '';
            }
          }
        }
      )
    }else{
      this.productValid = true;
    }
  }

  private alertFieldExist(infoText: string){
    //si existe informo con un alert que el usuario ya esta registrado
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: infoText,
    });    
  }

}
