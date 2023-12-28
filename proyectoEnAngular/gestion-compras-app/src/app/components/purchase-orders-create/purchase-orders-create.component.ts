import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../../models/purchase-order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supplier } from '../../models/suppliers';
import { PurchaseOrdersService } from '../../services/purchase-orders.service';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuppliersService } from '../../services/suppliers.service';
import { ProductPurchase } from '../../models/product-po';
import { Product } from '../../models/product';

@Component({
  selector: 'app-purchase-orders-create',
  templateUrl: './purchase-orders-create.component.html',
  styleUrl: './purchase-orders-create.component.css'
})
export class PurchaseOrdersCreateComponent implements OnInit {
  purchaseOrder!: PurchaseOrder;
  suppliers!: Supplier[];
  products!: ProductPurchase[];
  productsPurchase: ProductPurchase[] = [];
  productCode!: string;
  amount!: number;
  productsList!: Product[];

  supplierForm!: FormGroup;
  addProductForm!: FormGroup;
  productsForm!: FormGroup;
  submitForm!: FormGroup;

  supplierCode!: number;
  supplierInserted: boolean = false;
  productsInserted: boolean = false;
  existsSuppliers: boolean = true;
  existsProducts: boolean = true;

  exist: boolean = true;

  emissionDate!: Date;
  deliveryDate!: Date;
  receptionInfo!: string;
  validDeliveryDate: boolean = true;

  constructor(
    private suppliersService: SuppliersService,
    private productsService: ProductsService,
    private purchaseOrdersService: PurchaseOrdersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.emissionDate = new Date();
    this.suppliers = this.suppliersService.getSuppliers();
    this.purchaseOrder = this.purchaseOrdersService.inicPurchaseOrder();

    if (this.suppliers.length === 0) {
      this.existsSuppliers = false;
    }

    this.supplierForm = this.fb.group({
      supplier: ['', [Validators.required]]
    });

  }

  submitSupplier(form: FormGroup) {
    if (form.valid) {
      //agregar el proveedor a la orden de compra
      const supplier: Supplier | null = this.suppliersService.getSupplier(this.supplierCode);

      this.productsList = this.productsService.getProductsBySupplierCode(this.supplierCode);

      if (supplier != null && this.productsList.length !== 0) {
        this.existsProducts = true;
        this.purchaseOrder.supplier = supplier;
        this.supplierInserted = true;

        //inicializo el siguiente formulario
        this.addProductForm = this.fb.group({
          product: ['', [Validators.required]],
          amount: ['', [Validators.required, Validators.min(1)]]
        });
      } else {
        this.existsProducts = false;
      }
    }
  }

  submitaddproduct(form: FormGroup) {
    if (form.valid) {
      //buscar el producto
      const product: Product | null = this.productsService.getProductByCode(this.productCode);

      if (product != null) {
        //convierto el producto en un producto de orden de compra con su respectiva cantidad
        const productPO = this.purchaseOrdersService.createProductPurchase(product, this.amount);

        //agrego el producto al arreglo de productos de orden de compra
        if (!this.addPurchase(productPO)) {
          this.productsPurchase.push(productPO);
        }

        form.reset();
      }
    }
  }

  addPurchase(productPO: ProductPurchase) {
    let i = 0;
    let added = false;
    while (i < this.productsPurchase.length && added === false) {
      if (this.productsPurchase[i].code === productPO.code) {
        this.productsPurchase[i].amount += productPO.amount;
        added = true;
      }
      i++;
    }

    return added;
  }

  calculateProductPrice(amount: number, price: number | undefined) {
    let total = 0;
    if (price !== undefined) {
      total = (amount * price);
    }
    return total;
  }

  resetExistsProducts() {
    this.existsProducts = true;
  }

  deleteProduct(index: number) {
    this.productsPurchase.splice(index, 1);
  }

  totalPrice() {
    let total = 0;

    for (let product of this.productsPurchase) {
      if (product.price !== undefined) {
        total += (product.amount * product.price);
      }

    }

    return total;
  }

  submitProducts() {
    //cargo los productos
    this.purchaseOrder.products = this.productsPurchase;
    this.purchaseOrder.total = this.totalPrice();

    this.productsInserted = true;

    this.inicSubmitForm();
  }

  submitInformation(form: FormGroup) {
    if (form.valid) {
      this.validDeliveryDate = this.validateDeliveryDate()

      if (this.validDeliveryDate) {
        //si tengo una fecha de entrega valida continuo
        this.purchaseOrder.emissionDate = this.emissionDate;
        this.purchaseOrder.deliveryDate = this.deliveryDate;
        this.purchaseOrder.receptionInfo = this.receptionInfo;
        this.purchaseOrder.id = this.purchaseOrdersService.getLastId()+1;

        console.log(this.purchaseOrder);

        this.purchaseOrdersService.addPurchaseOrder(this.purchaseOrder);

        alert('La Orden de compra se creo correctamente'); //esto iria en el subscribe

        //lo redirijo a la ventana de proveedores
        this.router.navigate(['/purchase-orders']);
      }
    }
  }

  inicSubmitForm() {
    //inicializo el siguiente formulario
    this.submitForm = this.fb.group({
      deliveryDate: ['', [Validators.required]],
      receptionInfo: ['', [Validators.required]]
    });
  }

  inicEmissionDate() {
    let datePicker = <HTMLInputElement>document.getElementById('emissionDateInput');
    this.emissionDate = new Date();

    let day = ("0" + this.emissionDate.getDate()).slice(-2);
    let month = ("0" + (this.emissionDate.getMonth() + 1)).slice(-2);
    let year = this.emissionDate.getFullYear();

    datePicker.value = `${year}-${month}-${day}`;
  }

  setMinDeliveryDay() {
    let datePicker = <HTMLInputElement>document.getElementById('deliveryDateInput');

    datePicker.min = this.getMinDeliveryDay();
  }

  getMinDeliveryDay() {
    let today = new Date();

    let day = ("0" + today.getDate()).slice(-2);
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let year = today.getFullYear();

    return `${year}-${month}-${day}`;
  }

  validateDeliveryDate() {
    let valid = false;
    let inputDateString = this.deliveryDate; // reemplaza esto con tu fecha de entrada
    let inputDate = new Date(inputDateString + 'T00:00'); // agrega la hora a la fecha de entrada

    let today = new Date();
    today.setHours(0, 0, 0, 0); // establece la hora de la fecha actual a medianoche

    if (inputDate > today) {
      valid = true;
      console.log('La fecha ingresada es mayor a la fecha actual.');
    } else {
      valid = false;
      console.log('La fecha ingresada no es mayor a la fecha actual.');
    }

    return valid
  }

}