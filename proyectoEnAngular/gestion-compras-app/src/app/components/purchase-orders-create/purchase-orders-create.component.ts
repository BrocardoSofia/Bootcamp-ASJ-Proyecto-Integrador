import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../../models/purchase-order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supplier } from '../../models/suppliers';
import { PurchaseOrdersService } from '../../services/purchase-orders.service';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliersService } from '../../services/suppliers.service';
import { ProductPurchase } from '../../models/product-po';

@Component({
  selector: 'app-purchase-orders-create',
  templateUrl: './purchase-orders-create.component.html',
  styleUrl: './purchase-orders-create.component.css'
})
export class PurchaseOrdersCreateComponent implements OnInit{
  purchaseOrder!: PurchaseOrder;
  suppliers!: Supplier[];
  products!: ProductPurchase[];
  productsPurchase: ProductPurchase[] = [];

  supplierForm!: FormGroup;
  submitForm!: FormGroup;
  addProductForm!: FormGroup;
  productsForm!: FormGroup;
  
  supplierCode!:number;
  supplierInserted: boolean = false;
  existsSuppliers:boolean = true;

  exist:boolean = true;

  constructor(
    private suppliersService: SuppliersService,
    private purchaseOrdersService: PurchaseOrdersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.suppliers = this.suppliersService.getSuppliers();
    this.purchaseOrder = this.purchaseOrdersService.inicPurchaseOrder();

    if(this.suppliers.length === 0){
      this.existsSuppliers = false;
    }

    this.supplierForm = this.fb.group({
      supplier: ['', [Validators.required]]
    });
  }

  submitSupplier(form: FormGroup) {
    if(form.valid){
      //agregar el proveedor a la orden de compra
      const supplier:Supplier|null = this.suppliersService.getSupplier(this.supplierCode);

      if(supplier != null){
        this.purchaseOrder.supplier = supplier;
        this.supplierInserted = true;

        //inicializo el siguiente formulario
        this.addProductForm = this.fb.group({
          product: ['', [Validators.required]]
        });
      } 
    }
  }

  submitaddproduct(form: FormGroup) {
    if(form.valid){
      //agregar el proveedor a la orden de compra
      const supplier:Supplier|null = this.suppliersService.getSupplier(this.supplierCode);

      if(supplier != null){
        this.purchaseOrder.supplier = supplier;
        this.supplierInserted = true;
      } 
    }
  }

  submitProducts(form: FormGroup) {
    if(form.valid){
      //agregar el proveedor a la orden de compra
      const supplier:Supplier|null = this.suppliersService.getSupplier(this.supplierCode);

      if(supplier != null){
        this.purchaseOrder.supplier = supplier;
        this.supplierInserted = true;
      } 
    }
  }

}
