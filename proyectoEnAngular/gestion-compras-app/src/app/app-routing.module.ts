import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersComponent } from './components/supplier/suppliers/suppliers.component';
import { ProductsComponent } from './components/product/products/products.component';
import { PurchaseOrdersComponent } from './components/purchase-order/purchase-orders/purchase-orders.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SuppliersCreateComponent } from './components/supplier/suppliers-create/suppliers-create.component';
import { ProductsCreateComponent } from './components/product/products-create/products-create.component';
import { PurchaseOrdersCreateComponent } from './components/purchase-order/purchase-orders-create/purchase-orders-create.component';
import { SupplierDetailComponent } from './components/supplier/supplier-detail/supplier-detail.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { PurchaseOrderDetailComponent } from './components/purchase-order/purchase-order-detail/purchase-order-detail.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'index', component: WelcomeComponent },
  { path: 'suppliers',
    children: [
      { path: '', component: SuppliersComponent },
      { path: 'create', component: SuppliersCreateComponent },
      { path: 'modify', component: SuppliersCreateComponent },
      { path: 'detail', component: SupplierDetailComponent },
    ],
  },
  { path: 'products',
    children: [
      { path: '', component: ProductsComponent },
      { path: 'create', component: ProductsCreateComponent },
      { path: 'modify', component: ProductsCreateComponent },
      { path: 'detail', component: ProductDetailComponent },
    ],
  },
  { path: 'purchase-orders', 
    children: [
      { path: '', component: PurchaseOrdersComponent },
      { path: 'create', component: PurchaseOrdersCreateComponent },
      { path: 'detail', component: PurchaseOrderDetailComponent },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
