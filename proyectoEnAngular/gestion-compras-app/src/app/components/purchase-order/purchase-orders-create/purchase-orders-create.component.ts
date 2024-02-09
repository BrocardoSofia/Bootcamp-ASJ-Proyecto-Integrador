import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../../../models/purchase-order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supplier } from '../../../models/suppliers';
import { PurchaseOrdersService } from '../../../services/purchase-orders.service';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliersService } from '../../../services/suppliers.service';
import { ProductPurchase } from '../../../models/product-po';
import { Product } from '../../../models/product';
import Swal from 'sweetalert2';
import { auto } from '@popperjs/core';

type SortOrder = 'None' | 'asc' | 'desc';

@Component({
  selector: 'app-purchase-orders-create',
  templateUrl: './purchase-orders-create.component.html',
  styleUrl: './purchase-orders-create.component.css'
})
export class PurchaseOrdersCreateComponent implements OnInit {
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
  productsValid:boolean = false;
  currentDate = new Date();

  oldPurchaseOrder!:PurchaseOrder;

  purchaseOrder!:PurchaseOrder;
  supplierSavedId:number = -1;
  continueSupplier: boolean = false;

  products:Product[] = [];

  indexProductSelected:number = -1;
  productAmount: number = 0;
  alertAmountMin: boolean = false;

  productPurchase: ProductPurchase[] = [];

  detailForm!: FormGroup;

  deliveryDate:Date | null = null;
  receptionInfo: string = ''; 

  constructor(
    private suppliersService: SuppliersService,
    private productsService: ProductsService,
    private purchaseOrdersService: PurchaseOrdersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.detailForm = this.fb.group({
      deliveryDate: ['', [Validators.required, this.validateDate]],
      receptionInfo: ['']
    });

    this.oldPurchaseOrder = this.purchaseOrdersService.inicPurchaseOrder();
    this.purchaseOrder = this.purchaseOrdersService.inicPurchaseOrder();

    this.suppliersService.getAllActiveSuppliers(0,this.getSort(),this.searchBusinessName,
    this.searchSupplierCode,this.searchSupplierCategoryId).subscribe(
      response=>{
        this.suppliers = response.content;
      }
    )

  }

  validateDate(control:any) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    return selectedDate > currentDate ? null : { fechaInvalida: true };
  }

  submitForm() {
    if(!this.edit){
      this.createPurchaseOrder();
    }else{
      this.modifyPurchaseOrder();
    }
  }

  createPurchaseOrder(){
    let deliveryDate: any = this.detailForm.get('deliveryDate');
    let receptionInfo: any = this.detailForm.get('receptionInfo');
    if (this.detailForm.valid && deliveryDate !== null && receptionInfo!==null) {
      this.purchaseOrder.deliveryDate = deliveryDate.value;
      this.purchaseOrder.receptionInfo = receptionInfo.value;

      //agregar a la base de datos
      this.purchaseOrdersService.addPurchaseOrder(this.purchaseOrder).subscribe(
        response=>{
          //luego de agregar la orden de compra agregar los productos
          this.callProductPurchaseSequentially(response);

          //mensaje de que se agrego todo correctamente y lo envio a la pagina anterior
          this.productLoadedSuccessfully('Se agrego correctamente la orden de compra: ' + response.purchaseOrderNumber);
        }
      )
    }
  }

  async callProductPurchaseSequentially(purchaseOrderAdded: PurchaseOrder) {
    for (const product of this.productPurchase) {
      product.purchaseOrder = purchaseOrderAdded;

      try {
          await this.purchaseOrdersService.addPurchaseOrderProduct(product).toPromise();
      } catch (error) {
          console.error('Error al agregar el producto:', error);
      }
    }
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
    this.router.navigate(['/purchase-orders']);
  }

  modifyPurchaseOrder(){

  }

  getCurrentDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
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
    this.purchaseOrder.supplier = supplier;
    this.supplierSavedId = supplier.id;
    this.continueSupplier = true;

    //cargo el arreglo de categorias en base a el id del rubro
    this.productsService.getAllProductsBySupplierId(supplier.id).subscribe(
      response=>{
        this.products = response;
      }
    )
  }

  supplierForm(){
    this.supplierValid = true;
  }

  addProduct(){
    let productPurchase: ProductPurchase = this.productToProductPurchase();

    //veo si existe el producto en el array
    let pos = this.posProduct(productPurchase);
    if(pos !== -1){
      //si existe le modifico la cantidad
      this.productPurchase[pos].amount += productPurchase.amount;
    }else{
      //si no existe lo agrego
      this.productPurchase.push(productPurchase);
    }

    this.productAmount = 0;
    this.indexProductSelected = -1;
  }

  private posProduct(productPurchase: ProductPurchase){
    let i: number = 0;
    let pos:number = -1;

    while(i<this.productPurchase.length && pos === -1){
      if(this.productPurchase[i].product.id == productPurchase.product.id){
        pos = i;
      }
      i++;
    }

    return pos;
  }

  deleteProduct(i: number){
    if (i >= 0 && i < this.productPurchase.length) {
      this.productPurchase.splice(i, 1);
    }
  }

  private productToProductPurchase(){
    let productPurchase: ProductPurchase = {
      id: 0,
      purchaseOrder: this.purchaseOrdersService.inicPurchaseOrder(),
      product: this.productsService.inicProduct(),
      productCategory: {
        id: 0,
        category: '',
        supplierCategory: {
          id: 0,
          category: '',
          createdAt: new Date,
          updatedAt: null,
          deletedAt: null,
          products: []
        },
        createdAt: new Date,
        updatedAt: null,
        deletedAt: null
      },
      price: 0,
      amount: 0,
      createdAt: new Date
    }

    productPurchase.product = this.products[this.indexProductSelected];
    productPurchase.productCategory = this.products[this.indexProductSelected].productCategory;
    productPurchase.price = this.products[this.indexProductSelected].price;
    productPurchase.amount = this.productAmount;

    return productPurchase;

  }

  getTotal(product: ProductPurchase){
    return (product.price * product.amount);
  }

  getFinal(){
    let final: number = 0;

    for(let product of this.productPurchase){
      final += (product.amount * product.price);
    }
    return final;
  }

  continueProducts(){
    //set purchase state
    this.purchaseOrder.purchaseState.id = 1;
    this.purchaseOrdersService.getLastPurchaseOrderNumber().subscribe(
      data=>{
        this.purchaseOrder.purchaseOrderNumber = data;
        this.productsValid = true;
      }
    )
  }


}